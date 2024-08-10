import { db } from "../db";

export async function getProducts() {
  try {
    const products = await db.product.findMany();

    return products;
  } catch (error) {
    return null;
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  } catch (error) {
    return null;
  }
}
