import { db } from "../db";

export async function getMarkets() {
  try {
    const markets = await db.market.findMany();

    return markets;
  } catch (error) {
    return null;
  }
}

export async function getMarketsByUser(userId: string) {
  try {
    const markets = await db.market.findMany({
      where: {
        userId,
      },
    });

    return markets;
  } catch (error) {
    return null;
  }
}

export async function getMarketById(
  id: string,
  productsInStock: boolean = false
) {
  try {
    const orderBy = {
      orderBy: {
        id: "desc" as any,
      },
    };

    const query = productsInStock
      ? {
          where: {
            stock: {
              gt: 0,
            },
          },
          ...orderBy,
        }
      : orderBy;

    const market = await db.market.findUnique({
      where: {
        id,
      },
      include: {
        products: query,
      },
    });

    return market;
  } catch (error) {
    return null;
  }
}

export async function getMarketByProductId(productId: string) {
  try {
    const product = await db.product.findUnique({
      select: {
        market: true,
      },
      where: {
        id: productId,
      },
    });

    return product?.market;
  } catch (error) {
    return null;
  }
}

export async function getMarketByInvoiceNumber(invoiceNumber: string) {
  try {
    const buy = await db.buy.findUnique({
      select: { market: true },
      where: {
        invoiceNumber,
      },
    });

    return buy?.market;
  } catch (error) {
    return null;
  }
}
