import { currentUser } from "@auth-astro/session";
import { getUserCart } from "@data/cart";
import { getExchangeRateByMarket } from "@data/currencies";
import { getMarketByProductId } from "@data/markets";
import { getUserByMarketId } from "@data/users";
import { Currency, type BuyProduct } from "@prisma/client";
import { CART_COOKIES_KEY } from "@utils/constants/cart";
import { convertCurrency } from "@utils/currencies";
import { sendBuyClientEmail } from "@utils/email/buyClient";
import {
  createInvoice,
  type InvoiceData,
  type InvoiceProduct,
  type InvoiceSender,
} from "@utils/invoices";
import { generateUniqueId } from "@utils/utils";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { db } from "src/lib/db";

export const invoices = {
  createInvoice: defineAction({
    accept: "form",
    input: z.object({
      phone: z.string().max(50),
      currency: z.nativeEnum(Currency).default(Currency.USD),
    }),
    handler: async ({ phone, currency }, context) => {
      const currCart = await getUserCart(context);

      if (currCart) {
        const productId = currCart.cartItems[0].productId;

        const market = await getMarketByProductId(productId);

        if (!market)
          throw new ActionError({
            code: "CONFLICT",
            message: "El mercado no existe, o no se pudo encontrar.",
          });

        const marketManager = await getUserByMarketId(market.id);

        if (!marketManager)
          throw new ActionError({
            code: "CONFLICT",
            message:
              "No existe un manager para el mercado en el que desea comprar.",
          });

        const sender = {
          address: market.contact?.address,
          company: market.name,
          phone: market.contact.phone1,
        } as InvoiceSender;

        const exchangeRates = await getExchangeRateByMarket(market.id);

        if (!exchangeRates)
          throw new ActionError({
            code: "CONFLICT",
            message: "No se pudo acceder a las tasas de cambio actuales.",
          });

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
            amount: price * item.quantity,
          };
        });

        if (!products || products.length <= 0)
          throw new ActionError({
            code: "CONFLICT",
            message: "Debe añadir productos al carro.",
          });

        const invoiceNumber = generateUniqueId();

        const user = await currentUser(context.request);

        const data: InvoiceData = {
          sender,
          client: {
            name: user?.name,
            phone,
          },
          products,
          settings: {
            currency,
          },
          information: {
            number: invoiceNumber,
            date: new Date().toISOString(),
          },
        };

        const invoice = await createInvoice(data);

        if (!invoice)
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Hubo problemas al generar su factura.",
          });

        const managerName = marketManager.name || "Manager";

        const pdfBase64 = invoice.toString("base64");

        try {
          await sendBuyClientEmail({
            subject: invoiceNumber,
            to: marketManager.email,
            template: {
              params: {
                name: managerName,
                phone,
                invoiceNumber,
                invoiceBase64: pdfBase64,
              },
            },
          });
        } catch (error) {
          console.error("Error al enviar correo de compra. ", error);
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Hubo problemas al completar su compra.",
          });
        }

        try {
          const products: BuyProduct[] = currCart.cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          }));

          await db.buy.create({
            data: {
              marketId: market.id,
              products,
              invoiceNumber,
              invoicePdfBase64: pdfBase64,
            },
          });
        } catch (error) {
          console.error("Error al crear registro de compra. ", error);
        }

        // Eliminando carro
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

        return {
          number: invoiceNumber,
          pdf: pdfBase64,
          phone,
        };
      }

      // Si no hay carro retorno un error
      throw new ActionError({
        code: "CONFLICT",
        message: "No se pudo encontrar su carro.",
      });
    },
  }),
};
