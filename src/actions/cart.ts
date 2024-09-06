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
      try {
        const currCart = await getUserCartOrCreate(context);

        if (currCart) {
          const cookieStore = context.cookies;
          cookieStore.set(CART_COOKIES_KEY, currCart.id, { path: "/" });

          const existingProduct = currCart.cartItems.some(
            (cartItem) => cartItem.product.id === productId
          );

          if (existingProduct) {
            // Aqui debo aumentar la cantidad del producto y no agregarlo nuevamente
            await db.cartItem.update({
              data: {
                quantity: {
                  increment: 1,
                },
              },
              where: {
                cartId_productId: {
                  cartId: currCart.id,
                  productId,
                },
              },
            });
            return;
          }

          await db.cartItem.create({
            data: {
              cartId: currCart.id,
              productId,
              quantity: 1,
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
          await db.cartItem.delete({
            where: {
              cartId_productId: {
                cartId: currCart.id,
                productId,
              },
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
