import { getUserCart } from "@data/cart";
import { getExchangeRateByMarket } from "@data/currencies";
import { getMarketByProductId } from "@data/markets";
import { getUserByMarketId } from "@data/users";
import { Currency } from "@prisma/client";
import { CART_COOKIES_KEY } from "@utils/constants/cart";
import { convertCurrency } from "@utils/currencies";
import { sendBuyClientEmail } from "@utils/email/buyClient";
import { generateUniqueId } from "@utils/utils";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import easyinvoice, {
  type InvoiceData,
  type InvoiceProduct,
  type InvoiceSenderOrClient,
} from "easyinvoice";
import { db } from "src/lib/db";

export const invoices = {
  createInvoice: defineAction({
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

          const marketManager = await getUserByMarketId(market.id);

          if (!marketManager) return;

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

          const invoiceId = generateUniqueId();

          const invoiceNumber = `Factura ${invoiceId}`;

          const data: InvoiceData = {
            apiKey: import.meta.env.INVOICES_API_KEY,
            mode: import.meta.env.INVOICES_MODE,
            sender,
            products,
            settings: {
              currency,
            },
            information: {
              number: invoiceNumber,
            },
          };

          const invoice = await easyinvoice.createInvoice(data);

          if (!invoice) return;

          const managerName = marketManager.name || "Manager";

          try {
            await sendBuyClientEmail({
              subject: invoiceNumber,
              to: marketManager.email,
              template: {
                params: {
                  name: managerName,
                  invoiceNumber,
                  invoiceBase64: invoice.pdf,
                },
              },
            });
          } catch (error) {
            console.error("Error al enviar correo de compra. ", error);
          }

          // Eliminando carrito
          const cartItemsToDelete =
            currCart?.cartItems.map((item) => item.id) || [];

          await db.cartItem.deleteMany({
            where: {
              id: {
                in: cartItemsToDelete,
              },
            },
          });

          await db.cart.delete({
            where: {
              id: currCart?.id,
            },
          });

          context.cookies.delete(CART_COOKIES_KEY);

          return invoice.pdf;
        }
      } catch (error) {
        console.error("Hubo un error al terminar una compra. ", error);
      }
    },
  }),
};
