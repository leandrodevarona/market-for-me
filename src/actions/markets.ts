import { ActionError, defineAction } from "astro:actions";
import { db } from "../lib/db";
import { createMarketSchema, updateMarketSchema } from "src/lib/zod/schemas";
import { deleteMultipleImages, uploadMarketImage } from "@utils/cloudinary";
import { currentUser } from "@auth-astro/session";
import { getExchangeRate } from "@data/currencies";
import { z } from "astro:schema";
import { getMarketById } from "@data/markets";

export const markets = {
  createMarket: defineAction({
    accept: "form",
    input: createMarketSchema,
    handler: async (
      { name, description, image, address, phone1, phone2 },
      context
    ) => {
      let createdMarket = null;

      let marketImage = null;

      if (image) marketImage = await uploadMarketImage(image);

      const user = await currentUser(context.request);

      if (!user?.id) return { id: undefined };

      const exchangeRates = await getExchangeRate();

      try {
        createdMarket = await db.market.create({
          data: {
            name,
            description,
            imageUrl: marketImage,
            userId: user.id,
            contact: {
              address,
              phone1,
              phone2,
            },
            exchangeRates: {
              USD: { value: exchangeRates.avg.usd },
              EUR: { value: exchangeRates.avg.eur },
              MLC: { value: exchangeRates.avg.mlc },
              CUP: { value: 1 },
            },
          },
        });
      } catch (error) {
        console.error(error);
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "No se pudo crear el mercado.",
        });
      }

      return { id: createdMarket?.id };
    },
  }),
  updateMarket: defineAction({
    accept: "form",
    input: updateMarketSchema,
    handler: async ({
      marketId,
      name,
      description,
      image,
      address,
      phone1,
      phone2,
    }) => {
      let mutateMarket = null;

      let marketImage = undefined;

      if (image) {
        const newMarketImage = await uploadMarketImage(image);
        if (newMarketImage) marketImage = newMarketImage;
      }

      try {
        mutateMarket = await db.market.update({
          where: {
            id: marketId,
          },
          data: {
            name,
            description,
            contact: {
              address,
              phone1,
              phone2,
            },
            imageUrl: marketImage,
          },
        });
      } catch (error) {
        console.error(error);
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "No se puedo actualizar el mercado.",
        });
      }

      return { id: mutateMarket?.id };
    },
  }),
  deleteMarket: defineAction({
    accept: "form",
    input: z.object({
      marketId: z.string(),
    }),
    handler: async ({ marketId }) => {
      try {
        const market = await getMarketById(marketId);

        if (!market)
          throw new ActionError({
            code: "CONFLICT",
            message: "Mercado no encontrado.",
          });

        const products = market.products;

        const imageUrls = products.flatMap((product) => product.imageUrls);
        if (market.imageUrl) imageUrls.push(market.imageUrl);

        await deleteMultipleImages(imageUrls);

        await db.product.deleteMany({
          where: {
            marketId,
          },
        });

        await db.market.delete({
          where: {
            id: marketId,
          },
        });
      } catch (error) {
        throw new ActionError({
          code: "CONFLICT",
          message: "No se pudo eliminar el mercado.",
        });
      }
    },
  }),
  visitRandomMarket: defineAction({
    accept: "form",
    handler: async () => {
      try {
        const count = await db.market.count();

        const randomIndex = Math.floor(Math.random() * count);

        const randomMarket = await db.market.findMany({
          take: 1,
          skip: randomIndex,
        });

        return { id: randomMarket[0].id };
      } catch (error) {
        throw new ActionError({
          code: "CONFLICT",
          message: "No se puede visitar un mercado en estos momentos.",
        });
      }
    },
  }),
};
