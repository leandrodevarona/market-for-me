import { ActionError, defineAction } from "astro:actions";
import { db } from "../lib/db";
import { createMarketSchema, updateMarketSchema } from "src/lib/zod/schemas";
import { uploadMarketImage } from "@utils/cloudinary";
import { currentUser } from "@auth-astro/session";
import { Routes } from "@utils/routes";
import { getExchangeRate } from "@data/currencies";

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

      if (!user?.id) return context.rewrite(Routes.home);

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
      }

      return createdMarket ?? 0;
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
      }

      return mutateMarket ?? 0;
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
