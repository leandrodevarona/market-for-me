import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db } from "../lib/db";
import { updateProductSchema } from "src/lib/zod/schemas";
import { uploadProductImage } from "@utils/cloudinary";

export const products = {
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
      stock,
      description,
      images,
    }) => {
      let mutateProduct = null;

      let imageUrls: string[] = [];

      for (let index = 0; index < images.length; index++) {
        const element = images[index];
        if (element) {
          const newUrl = await uploadProductImage(element);
          if (newUrl) imageUrls.push(newUrl);
        }
      }

      try {
        mutateProduct = await db.product.update({
          where: {
            id: productId,
          },
          data: {
            name,
            price,
            currency,
            stock,
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
