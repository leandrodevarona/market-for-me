import type { ActionAPIContext } from "astro/actions/runtime/utils.js";
import { db } from "../db";
import { currentUser } from "@auth-astro/session";
import { CART_COOKIES_KEY } from "@utils/constants";
import { Currency } from "@prisma/client";

export async function getUserCart(context: ActionAPIContext) {
  try {
    const cookieStore = context.cookies;

    let cartId = null;

    if (cookieStore.has(CART_COOKIES_KEY))
      cartId = cookieStore.get(CART_COOKIES_KEY)?.value;

    if (cartId) {
      const currCart = await db.cart.findUnique({
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
        where: {
          id: cartId,
        },
      });

      return currCart;
    }

    const user = await currentUser(context.request);
    const userId = user?.id;

    if (!userId) return null;

    const currCart = await db.cart.findUnique({
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
      where: {
        userId,
      },
    });

    return currCart;
  } catch (error) {
    return null;
  }
}

export async function getUserCartOrCreate(context: ActionAPIContext) {
  try {
    const user = await currentUser(context.request);
    const userId = user?.id;

    let currCart = await getUserCart(context);

    // Si no tiene carrito le creo uno vacío aunque esté autenticado o no
    if (!currCart) {
      currCart = await db.cart.create({
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
        data: {
          userId,
        },
      });
    }

    return currCart;
  } catch (error) {
    return null;
  }
}

export async function getCartItems(context: ActionAPIContext) {
  try {
    const currCart = await getUserCart(context);

    return currCart?.cartItems;
  } catch (error) {
    return null;
  }
}

export async function getCartSubtotal(context: ActionAPIContext) {
  const subtotalByCurrency: Record<Currency, string> = {
    USD: `0 ${Currency.USD}`,
    EUR: `0 ${Currency.EUR}`,
    CUP: `0 ${Currency.CUP}`,
  };

  try {
    const currCart = await getUserCart(context);

    if (currCart) {
      // Subtotal de USD
      const subtotalUSD = currCart.cartItems.reduce((accumulator, item) => {
        const value =
          item.product.currency === Currency.USD
            ? item.product.price * item.quantity
            : 0;
        return accumulator + value;
      }, 0);

      subtotalByCurrency.USD = `${subtotalUSD.toFixed(2)} ${Currency.USD}`;

      // Subtotal de EUR
      const subtotalEUR = currCart.cartItems.reduce((accumulator, item) => {
        const value =
          item.product.currency === Currency.EUR
            ? item.product.price * item.quantity
            : 0;
        return accumulator + value;
      }, 0);

      subtotalByCurrency.EUR = `${subtotalEUR.toFixed(2)} ${Currency.EUR}`;

      // Subtotal de CUP
      const subtotalCUP = currCart.cartItems.reduce((accumulator, item) => {
        const value =
          item.product.currency === Currency.CUP
            ? item.product.price * item.quantity
            : 0;
        return accumulator + value;
      }, 0);

      subtotalByCurrency.CUP = `${subtotalCUP.toFixed(2)} ${Currency.CUP}`;
    }
  } catch (error) {
    console.error("Error al calcular subtotal de carrito de compras. ", error);
  }

  return subtotalByCurrency;
}
