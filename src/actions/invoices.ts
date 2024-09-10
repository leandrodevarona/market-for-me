import { getUserCart } from "@data/cart";
import { getExchangeRateByMarket } from "@data/currencies";
import { getMarketByProductId } from "@data/markets";
import { Currency } from "@prisma/client";
import { convertCurrency } from "@utils/currencies";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import easyinvoice, {
  type InvoiceData,
  type InvoiceProduct,
  type InvoiceSenderOrClient,
} from "easyinvoice";

export const invoices = {
  generateInvoice: defineAction({
    accept: "form",
    input: z.object({
      currency: z.nativeEnum(Currency).default(Currency.USD),
    }),
    handler: async ({ currency }, context) => {
      try {
        const currCart = await getUserCart(context);

        if (currCart) {
          const productId = currCart.cartItems[0].productId;

          const market = await getMarketByProductId(productId);

          if (!market) return;

          const sender = {
            address: market.contact?.address,
            company: market.name,
          } as InvoiceSenderOrClient;

          const exchangeRates = await getExchangeRateByMarket(market.id);

          if (!exchangeRates) return;

          const products: InvoiceProduct[] = currCart.cartItems.map((item) => {
            const price = convertCurrency(
              exchangeRates,
              item.product.price,
              item.product.currency,
              currency
            );

            return {
              quantity: item.quantity.toString(),
              description: item.product.name,
              taxRate: 0,
              price,
            };
          });

          if (!products || products.length <= 0) return;

          const data: InvoiceData = {
            apiKey: import.meta.env.INVOICES_API_KEY,
            mode: import.meta.env.INVOICES_MODE,
            sender,
            products,
            settings: {
              currency,
            },
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
