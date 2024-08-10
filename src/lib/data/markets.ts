import { db } from "../db";

export async function getMarkets() {
  try {
    const markets = await db.market.findMany();

    return markets;
  } catch (error) {
    return null;
  }
}

export async function getMarketById(id: string) {
  try {
    const market = await db.market.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    return market;
  } catch (error) {
    return null;
  }
}
