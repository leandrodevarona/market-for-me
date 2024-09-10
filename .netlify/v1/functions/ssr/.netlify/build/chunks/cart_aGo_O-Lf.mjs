import { g as getSession, d as db } from './server_DBUda-Za.mjs';
import { Currency } from '@prisma/client';

async function currentUser(request) {
  const session = await getSession(request);
  return session?.user;
}

const CART_COOKIES_KEY = "cartId";

async function getUserCart(context) {
  try {
    const cookieStore = context.cookies;
    let cartId = null;
    if (cookieStore.has(CART_COOKIES_KEY))
      cartId = cookieStore.get(CART_COOKIES_KEY)?.value;
    if (cartId) {
      const currCart2 = await db.cart.findUnique({
        include: {
          cartItems: {
            include: {
              product: true
            }
          }
        },
        where: {
          id: cartId
        }
      });
      return currCart2;
    }
    const user = await currentUser(context.request);
    const userId = user?.id;
    if (!userId) return null;
    const currCart = await db.cart.findUnique({
      include: {
        cartItems: {
          include: {
            product: true
          }
        }
      },
      where: {
        userId
      }
    });
    return currCart;
  } catch (error) {
    return null;
  }
}
async function getUserCartOrCreate(context) {
  try {
    const user = await currentUser(context.request);
    const userId = user?.id;
    let currCart = await getUserCart(context);
    if (!currCart) {
      currCart = await db.cart.create({
        include: {
          cartItems: {
            include: {
              product: true
            }
          }
        },
        data: {
          userId
        }
      });
    }
    return currCart;
  } catch (error) {
    return null;
  }
}
async function getCartItems(context) {
  try {
    const currCart = await getUserCart(context);
    return currCart?.cartItems;
  } catch (error) {
    return null;
  }
}
async function getCartSubtotal(context) {
  const subtotalByCurrency = {
    USD: `0 ${Currency.USD}`,
    EUR: `0 ${Currency.EUR}`,
    CUP: `0 ${Currency.CUP}`
  };
  try {
    const currCart = await getUserCart(context);
    if (currCart) {
      const subtotalUSD = currCart.cartItems.reduce((accumulator, item) => {
        const value = item.product.currency === Currency.USD ? item.product.price * item.quantity : 0;
        return accumulator + value;
      }, 0);
      subtotalByCurrency.USD = `${subtotalUSD.toFixed(2)} ${Currency.USD}`;
      const subtotalEUR = currCart.cartItems.reduce((accumulator, item) => {
        const value = item.product.currency === Currency.EUR ? item.product.price * item.quantity : 0;
        return accumulator + value;
      }, 0);
      subtotalByCurrency.EUR = `${subtotalEUR.toFixed(2)} ${Currency.EUR}`;
      const subtotalCUP = currCart.cartItems.reduce((accumulator, item) => {
        const value = item.product.currency === Currency.CUP ? item.product.price * item.quantity : 0;
        return accumulator + value;
      }, 0);
      subtotalByCurrency.CUP = `${subtotalCUP.toFixed(2)} ${Currency.CUP}`;
    }
  } catch (error) {
    console.error("Error al calcular subtotal de carrito de compras. ", error);
  }
  return subtotalByCurrency;
}

export { CART_COOKIES_KEY as C, getCartSubtotal as a, getUserCartOrCreate as b, currentUser as c, getUserCart as d, getCartItems as g };
