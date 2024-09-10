import { getUserCart } from "@data/cart";
import { defineAction } from "astro:actions";

import easyinvoice, {
  type InvoiceData,
  type InvoiceProduct,
} from "easyinvoice";

export const invoices = {
  generateInvoice: defineAction({
    accept: "form",
    handler: async (_, context) => {
      try {
        const currCart = await getUserCart(context);

        if (currCart) {
          const products: InvoiceProduct[] = currCart.cartItems.map((item) => ({
            quantity: item.quantity.toString(),
            description: item.product.name,
            taxRate: 0,
            price: item.product.price,
          }));

          const data: InvoiceData = {
            apiKey: import.meta.env.INVOICES_API_KEY,
            mode: import.meta.env.INVOICES_MODE,
            products,
          };

          const invoice = await easyinvoice.createInvoice(data);

          return invoice.pdf;
        }
      } catch (error) {
        console.error("Hubo un error al terminar una compra. ", error);
      }
    },
  }),
};
