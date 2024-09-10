import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db } from "../lib/db";
import { getUserCart, getUserCartOrCreate } from "@data/cart";
import { CART_COOKIES_KEY } from "@utils/constants/cart";

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

          const item = currCart.cartItems.find(
            (cartItem) => cartItem.product.id === productId
          );

          if (item) {
            if (item.quantity + 1 > item.product.stock + item.quantity) return;

            // Aqui debo aumentar la cantidad del producto y no agregarlo nuevamente
            await db.cartItem.update({
              data: {
                quantity: {
                  increment: 1,
                },
                product: {
                  update: {
                    stock: {
                      decrement: 1,
                    },
                  },
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

          const product = await db.product.findUnique({
            where: {
              id: productId,
            },
          });

          if (!product) return;
          if (product.stock <= 0) return;

          await db.cartItem.create({
            data: {
              cartId: currCart.id,
              productId,
              quantity: 1,
            },
          });

          await db.product.update({
            data: {
              stock: {
                decrement: 1,
              },
            },
            where: {
              id: productId,
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
        const currCart = await getUserCart(context);

        if (currCart) {
          const deletedItem = await db.cartItem.delete({
            where: {
              cartId_productId: {
                cartId: currCart.id,
                productId,
              },
            },
          });

          await db.product.update({
            data: {
              stock: {
                increment: deletedItem.quantity,
              },
            },
            where: {
              id: productId,
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
  incrDecrProductFromCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string(),
      action: z.enum(["INCR", "DECR"]),
    }),
    handler: async ({ productId, action }, context) => {
      try {
        const currCart = await getUserCart(context);

        if (currCart) {
          const item = currCart.cartItems.find(
            (cartItem) => cartItem.product.id === productId
          );

          if (!item) return;

          if (
            action === "INCR" &&
            item.quantity + 1 > item.product.stock + item.quantity
          )
            return;
          else if (action === "DECR" && item.quantity - 1 <= 0) {
            await db.cartItem.delete({
              where: {
                cartId_productId: {
                  cartId: currCart.id,
                  productId,
                },
              },
            });

            await db.product.update({
              data: {
                stock: {
                  increment: 1,
                },
              },
              where: {
                id: productId,
              },
            });

            return;
          }

          await db.cartItem.update({
            data: {
              quantity: {
                increment: action === "INCR" ? 1 : undefined,
                decrement: action === "DECR" ? 1 : undefined,
              },
              product: {
                update: {
                  stock: {
                    increment: action === "DECR" ? 1 : undefined,
                    decrement: action === "INCR" ? 1 : undefined,
                  },
                },
              },
            },
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
          "Ocurrió un error al incrementar/decrementar la cantidad de un producto en un carrito. ",
          error
        );
      }
    },
  }),
  completeBuy: defineAction({
    accept: "form",
    handler: async (_, context) => {
      try {
        const currCart = await getUserCart(context);

        const cartItemsToDelete =
          currCart?.cartItems.map((item) => item.id) || [];

        await db.cartItem.deleteMany({
          where: {
            id: {
              in: cartItemsToDelete,
            },
          },
        });

        await db.cart.delete({
          where: {
            id: currCart?.id,
          },
        });

        context.cookies.delete(CART_COOKIES_KEY);
      } catch (error) {
        console.error("Hubo un error al terminar una compra. ", error);
      }
    },
  }),
};
