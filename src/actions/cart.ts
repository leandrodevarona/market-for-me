import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db } from "../lib/db";
import { getUserCart, getUserCartOrCreate } from "@data/cart";
import { CART_COOKIES_KEY } from "@utils/constants";

export const cart = {
  addProductToCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string(),
    }),
    handler: async ({ productId }, context) => {
      console.log("El producto...", productId);
      try {
        const currCart = await getUserCartOrCreate(context);

        if (currCart) {
          const cookieStore = context.cookies;
          cookieStore.set(CART_COOKIES_KEY, currCart.id, { path: "/" });
        }

        const existingProduct = currCart?.products.some(
          (product) => product.id === productId
        );

        if (existingProduct) {
          // Aqui debo aumentar la cantidad del producto y no agregarlo nuevamente
          return;
        }

        if (currCart) {
          await db.cart.update({
            data: {
              products: {
                connect: {
                  id: productId,
                },
              },
            },
            where: {
              id: currCart.id,
            },
          });
        }
      } catch (error) {
        console.error(
          "Ocurrió un error al agregar un producto al carrito. ",
          error
        );
      }
    },
  }),
  deleteProductFromCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string(),
    }),
    handler: async ({ productId }, context) => {
      try {
        if (!productId) return null;

        const currCart = await getUserCart(context);

        if (currCart) {
          await db.cart.update({
            data: {
              products: {
                disconnect: {
                  id: productId,
                },
              },
            },
            where: {
              id: currCart.id,
            },
          });
        }
      } catch (error) {
        console.error(
          "Ocurrió un error al eliminar un producto de un carrito. ",
          error
        );
      }
    },
  }),
};
