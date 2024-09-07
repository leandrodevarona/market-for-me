import { getUserCart } from "@data/cart";
import { uploadClientInvoice } from "@utils/cloudinary";
import { ActionError, defineAction } from "astro:actions";

import easyinvoice, {
  type InvoiceData,
  type InvoiceProduct,
} from "easyinvoice";

export const invoices = {
  createAndSendInvoice: defineAction({
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
            mode: "development",
            products,
          };

          const invoice = await easyinvoice.createInvoice(data);

          const binaryString = Buffer.from(invoice.pdf, "base64");

          // Paso 2: Crear un Blob con los datos binarios
          const blob = new Blob([binaryString], { type: "application/pdf" });

          // Paso 3: Convertir el Blob en un objeto File
          const pdfFile = new File([blob], "invoice.pdf", {
            type: "application/pdf",
          });

          const pdfUrl = await uploadClientInvoice(pdfFile);

          return pdfUrl;
        }
      } catch (error) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: String(error),
        });
      }
    },
  }),
};
