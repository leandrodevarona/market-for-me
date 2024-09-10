import type { CartItem, Currency, Product } from "@prisma/client";

export type CartItemWithProduct = CartItem & { product: Product };

export type SubtotalByCurrency = Record<Currency, string>;
