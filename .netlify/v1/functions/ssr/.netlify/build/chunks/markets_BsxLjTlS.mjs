import { d as db } from './server_DBUda-Za.mjs';

async function getMarkets() {
  try {
    const markets = await db.market.findMany();
    return markets;
  } catch (error) {
    return null;
  }
}
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
async function getMarketById(id) {
  try {
    const market = await db.market.findUnique({
      where: {
        id
      },
      include: {
        products: true
      }
    });
    return market;
  } catch (error) {
    return null;
  }
}

export { getMarkets as a, getMarketsByUser as b, getMarketById as g };
