import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db } from "../lib/db";
import { updateProductSchema } from "src/lib/zod/schemas";
import { deleteMultipleImages, uploadProductImage } from "@utils/cloudinary";

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

        await deleteMultipleImages(deletedProduct.imageUrls);
      } catch (error) {
        console.error(error);
      }

      return deletedProduct ?? 0;
    },
  }),
  returnStock: defineAction({
    accept: "form",
    input: z.object({
      invoiceNumber: z.string(),
    }),
    handler: async ({ invoiceNumber }) => {
      let buy = null;
      try {
        buy = await db.buy.findUnique({
          where: {
            invoiceNumber,
          },
        });
      } catch (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message:
            "Hubo un problema al devolver el stock. Puede realizarlo manualmente desde un Panel de Administrador.",
        });
      }

      if (buy) {
        if (buy.returnedStock)
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "El stock de esta factura ya ha sido devuelto.",
          });

        const updatePromises = buy.products.map((product) => {
          return db.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        });

        try {
          await db.$transaction(updatePromises);

          await db.buy.update({
            data: {
              returnedStock: true,
            },
            where: {
              id: buy.id,
            },
          });
        } catch (error) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message:
              "Hubo un problema al devolver el stock. Puede realizarlo manualmente desde un Panel de Administrador.",
          });
        }

        return invoiceNumber;
      }
    },
  }),
};
