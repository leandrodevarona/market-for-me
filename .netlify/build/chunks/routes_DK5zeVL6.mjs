const Routes = {
  home: "/",
  markets: (marketId) => `/markets/${marketId}`,
  products: (productId) => `/products/${productId}`,
  adminHome: "/admin",
  adminMarkets: (marketId) => `/admin/markets/${marketId}`,
  adminCreateMarket: "/admin/markets/create"
};

export { Routes as R };
