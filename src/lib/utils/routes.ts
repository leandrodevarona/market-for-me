export const Routes = {
  home: "/",
  markets: (marketId: string) => `/markets/${marketId}`,
  products: (productId: string) => `/products/${productId}`,
  adminHome: "/admin",
  adminMarkets: (marketId: string) => `/admin/markets/${marketId}`,
  adminCreateMarket: "/admin/markets/create",
  cart: "/cart",
  returnStock: (invoiceNumber: string) =>
    `/admin/return-stock/${invoiceNumber}`,
  convertToManager: "/admin/convert-to-manager",
};
