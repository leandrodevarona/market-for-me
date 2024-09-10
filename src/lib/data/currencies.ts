import type { ExchangeRateApiResponse } from "@customTypes/currency";
import { Currency } from "@prisma/client";
import { db } from "../db";
import { getMarketById } from "./markets";
import { defaultExchangeRate } from "@utils/constants/currency";

export async function getExchangeRate() {
  try {
    const response = await fetch("https://mdiv.pro/api/get/vars");

    const data: ExchangeRateApiResponse = await response.json();

    return data;
  } catch (error) {
    return {
      avg: {
        usd: defaultExchangeRate.USD.value,
        eur: defaultExchangeRate.EUR.value,
        mlc: defaultExchangeRate.MLC.value,
      },
    };
  }
}

export async function getExchangeRateByMarket(marketId: string) {
  try {
    const data = await getExchangeRate();

    const exchangeRates: Record<Currency, number> = {
      USD: data.avg.usd,
      EUR: data.avg.eur,
      MLC: data.avg.mlc,
      CUP: 1,
    };

    const market = await getMarketById(marketId);

    if (!market) return null;

    const marketExchangeRate = market.exchangeRates;

    if (!marketExchangeRate) {
      const updatedMarket = await db.market.update({
        data: {
          exchangeRates: {
            USD: { value: exchangeRates.USD },
            EUR: { value: exchangeRates.EUR },
            MLC: { value: exchangeRates.MLC },
            CUP: { value: exchangeRates.CUP },
          },
        },
        where: {
          id: marketId,
        },
      });

      return updatedMarket.exchangeRates;
    }

    let updateData: Record<Currency, any> = {
      USD: undefined,
      EUR: undefined,
      MLC: undefined,
      CUP: undefined,
    };

    Object.values(Currency).map((currency) => {
      updateData[currency] = !marketExchangeRate[currency].editedByUser
        ? { value: exchangeRates[currency] }
        : undefined;
    });

    const updatedMarket = await db.market.update({
      data: {
        exchangeRates: {
          update: updateData,
        },
      },
      where: {
        id: marketId,
      },
    });

    return updatedMarket.exchangeRates;
  } catch (error) {
    // Para el caso en el que pueda fallar la API
    return defaultExchangeRate;
  }
}
