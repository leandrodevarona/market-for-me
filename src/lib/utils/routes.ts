export const Routes = {
  home: "/",
  markets: (marketId: string) => `/markets/${marketId}`,
  products: (productId: string) => `/products/${productId}`,
  adminHome: "/admin",
  adminMarkets: (marketId: string) => `/admin/markets/${marketId}`,
};
