import type { Currency, ExchangeRates } from "@prisma/client";

export function convertCurrency(
  exchangeRates: ExchangeRates,
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  if (!exchangeRates) return 0;

  if (fromCurrency === toCurrency) return amount;

  // Verificar si las monedas son válidas
  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    throw new Error("Moneda no soportada");
  }

  // Convertir el monto a CUP primero
  const amountInCUP = amount * exchangeRates[fromCurrency].value;

  // Luego convertir de CUP a la moneda de destino
  const convertedAmount = amountInCUP / exchangeRates[toCurrency].value;

  return convertedAmount;
}
