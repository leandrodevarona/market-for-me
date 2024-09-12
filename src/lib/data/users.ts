import { db } from "../db";

export async function getUsers() {
  try {
    const users = await db.user.findMany();

    return users;
  } catch (error) {
    return null;
  }
}

export async function getUserByMarketId(marketId: string) {
  try {
    const market = await db.market.findUnique({
      select: {
        user: true,
      },
      where: {
        id: marketId,
      },
    });

    return market?.user;
  } catch (error) {
    return null;
  }
}
