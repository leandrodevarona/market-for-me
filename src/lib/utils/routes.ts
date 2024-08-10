export const Routes = {
  home: "/",
  markets: (marketId: string) => `/markets/${marketId}`,
  products: (productId: string) => `/products/${productId}`,
};
