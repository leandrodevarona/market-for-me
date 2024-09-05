import { g as getSession, d as db } from './server_DBUda-Za.mjs';

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
          products: true
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
        products: true
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
          products: true
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
async function getProductsOnCart(context) {
  try {
    const currCart = await getUserCart(context);
    return currCart?.products;
  } catch (error) {
    return null;
  }
}

export { CART_COOKIES_KEY as C, getUserCartOrCreate as a, getUserCart as b, currentUser as c, getProductsOnCart as g };
