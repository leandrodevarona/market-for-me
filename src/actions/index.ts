import { defineAction, z } from "astro:actions";
import {
  createMarketSchema,
  updateMarketSchema,
  updateProductSchema,
} from "../lib/zod/schemas";
import { db } from "../lib/db";
import { currentUser } from "../lib/auth-astro/session";
import { Routes } from "../lib/utils/routes";
import { buildProject } from "../lib/build/build";
import { uploadMarketImage, uploadProductImage } from "@utils/cloudinary";

export const server = {
  // Mercados
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

      if (!user?.id) return context.redirect(Routes.home);

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
          },
        });
      } catch (error) {
        console.error(error);
      }

      await buildProject();

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

      await buildProject();

      return mutateMarket ?? 0;
    },
  }),
  // Productos
  createProduct: defineAction({
    accept: "form",
    input: z.object({
      marketId: z.string(),
    }),
    handler: async ({ marketId }) => {
      let createdProduct = null;

      try {
        createdProduct = await db.product.create({
          data: {
            marketId,
          },
        });
      } catch (error) {
        console.error(error);
      }

      return createdProduct ?? 0;
    },
  }),
  updateProduct: defineAction({
    accept: "form",
    input: updateProductSchema,
    handler: async ({
      productId,
      name,
      price,
      currency,
      description,
      images,
    }) => {
      let mutateProduct = null;

      let imageUrls = undefined;

      // Hay que hacer esto porque aunque no se cargue ninguna imagen llega un File en "images"
      let newImagesUrls = [];
      for (let index = 0; index < images.length; index++) {
        const element = images[index];
        if (element) {
          const newUrl = await uploadProductImage(element);
          if (newUrl) newImagesUrls.push(newUrl);
        }
      }

      if (newImagesUrls.length > 0) imageUrls = newImagesUrls;

      try {
        mutateProduct = await db.product.update({
          where: {
            id: productId,
          },
          data: {
            name,
            price,
            currency,
            description,
            imageUrls: {
              push: imageUrls,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }

      return mutateProduct ?? 0;
    },
  }),
  deleteProduct: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string(),
    }),
    handler: async ({ productId }) => {
      let deletedProduct = null;

      try {
        deletedProduct = await db.product.delete({
          where: {
            id: productId,
          },
        });
      } catch (error) {
        console.error(error);
      }

      return deletedProduct ?? 0;
    },
  }),
};
