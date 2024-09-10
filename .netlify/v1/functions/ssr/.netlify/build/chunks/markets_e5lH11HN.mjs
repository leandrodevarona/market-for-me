import { d as db } from './server_DBUda-Za.mjs';

async function getMarketsByUser(userId) {
  try {
    const markets = await db.market.findMany({
      where: {
        userId
      }
    });
    return markets;
  } catch (error) {
    return null;
  }
}
async function getMarketById(id, productsInStock = false) {
  try {
    const query = productsInStock ? {
      where: {
        stock: {
          gt: 0
        }
      }
    } : true;
    const market = await db.market.findUnique({
      where: {
        id
      },
      include: {
        products: query
      }
    });
    return market;
  } catch (error) {
    return null;
  }
}
async function getMarketByProductId(productId) {
  try {
    const product = await db.product.findUnique({
      select: {
        market: true
      },
      where: {
        id: productId
      }
    });
    return product?.market;
  } catch (error) {
    return null;
  }
}

export { getMarketsByUser as a, getMarketByProductId as b, getMarketById as g };
