import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, b as createAstro, d as addAttribute } from '../../../chunks/astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { $ as $$GenericFormMarket, a as $$PublishMarket } from '../../../chunks/PublishMarket_Dx09NybO.mjs';
/* empty css                                            */
import { $ as $$Icon } from '../../../chunks/Icon_Ch9NK6yf.mjs';
import { R as Routes } from '../../../chunks/routes_DG_8Jzi8.mjs';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CxSOFlco.mjs';
import { g as getMarketById } from '../../../chunks/markets_e5lH11HN.mjs';
import { a as actions } from '../../../chunks/_astro_actions_eApNQ-9a.mjs';
import 'clsx';
import { $ as $$Currencies } from '../../../chunks/Currencies_Df8hR4o3.mjs';
import { i as isInputError } from '../../../chunks/shared_DsA9hi-M.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$6 = createAstro();
const $$UpdateMarket = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$UpdateMarket;
  const { market } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="update_market__form astro-ql45oi6p"> ${renderComponent($$result, "GenericFormMarket", $$GenericFormMarket, { "market": market, "class": "astro-ql45oi6p" })} ${renderComponent($$result, "PublishMarket", $$PublishMarket, { "class": "astro-ql45oi6p" })} </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/forms/UpdateMarket.astro", void 0);

const $$Astro$5 = createAstro();
const $$MarketLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$MarketLink;
  const { marketId } = Astro2.params;
  if (!marketId) return;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([["primary_button", "centered_button", "market_link"], "astro-u5fig3hd"], "class:list")}${addAttribute(Routes.markets(marketId), "href")} target="_blank"> <span class="astro-u5fig3hd">Ver mercado</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:format-horizontal-align-right", "size": 20, "class": "astro-u5fig3hd" })} </a> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/links/MarketLink.astro", void 0);

const $$Astro$4 = createAstro();
const $$DeleteProduct = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$DeleteProduct;
  const { productId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form class="delete_product__form astro-qhbpsv6r" method="POST"${addAttribute(actions.products.deleteProduct, "action")}> <input type="text" name="productId"${addAttribute(productId, "value")} hidden class="astro-qhbpsv6r"> <button class="astro-qhbpsv6r">Eliminar</button> </form> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/products/forms/DeleteProduct.astro", void 0);

const $$Astro$3 = createAstro();
const $$UpdateProduct = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$UpdateProduct;
  const action = actions.products.updateProduct;
  const result = Astro2.getActionResult(action);
  const inputErrors = isInputError(result?.error) ? result.error.fields : {};
  const { product } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="update_product astro-ls27w35s"> <header class="update_product__header astro-ls27w35s"> <a${addAttribute(Routes.products(product.id), "href")} class="astro-ls27w35s">Ver producto</a> ${renderComponent($$result, "DeleteProduct", $$DeleteProduct, { "productId": product.id, "class": "astro-ls27w35s" })} </header> <form class="update_product__form astro-ls27w35s" method="POST"${addAttribute(action, "action")} enctype="multipart/form-data"> <input class="secondary_text__input astro-ls27w35s" type="text" name="productId"${addAttribute(product.id, "value")} hidden> <section class="astro-ls27w35s"> <label class="astro-ls27w35s">
Nombre
<input class="secondary_text__input astro-ls27w35s" type="text" name="name" required${addAttribute(150, "maxlength")}${addAttribute(product.name, "value")}> </label> ${inputErrors.name && renderTemplate`<p class="error astro-ls27w35s">${inputErrors.name.join(",")}</p>`} <label class="astro-ls27w35s">
Precio
<input class="secondary_text__input astro-ls27w35s" type="number" name="price" required${addAttribute(0, "min")} step=".01"${addAttribute(product.price, "value")}> </label> ${inputErrors.price && renderTemplate`<p class="error astro-ls27w35s">${inputErrors.price.join(",")}</p>`} <div class="update_product__currencyAndStock astro-ls27w35s"> ${renderComponent($$result, "Currencies", $$Currencies, { "value": product.currency, "class": "astro-ls27w35s" })} ${inputErrors.currency && renderTemplate`<p class="error astro-ls27w35s">${inputErrors.currency.join(",")}</p>`} <label class="astro-ls27w35s">
Stock
<input class=" astro-ls27w35s" type="number" name="stock"${addAttribute(0, "min")}${addAttribute(product.stock, "value")} required> </label> </div> </section> <section class="astro-ls27w35s"> <label class="astro-ls27w35s">
Descripción
<textarea class="secondary_text__input astro-ls27w35s" name="description"${addAttribute(1e3, "maxlength")}>${product.description}</textarea> </label> ${inputErrors.description && renderTemplate`<p class="error astro-ls27w35s">${inputErrors.description.join(",")}</p>`} <label class="astro-ls27w35s">
Imágenes
<input class="secondary_text__input astro-ls27w35s" type="file" name="images" multiple accept="image/*"> </label> ${inputErrors.images && renderTemplate`<p class="error astro-ls27w35s">${inputErrors.images.join(",")}</p>`} </section> <button class="primary_button astro-ls27w35s">Editar producto</button> </form> </li> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/products/forms/UpdateProduct.astro", void 0);

const $$Astro$2 = createAstro();
const $$MarketProductList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MarketProductList;
  const { products } = Astro2.props;
  return renderTemplate`${products && products.length > 0 && renderTemplate`${maybeRenderHead()}<ul class="market_product__list astro-rvaksmwl">${products.map((product) => renderTemplate`${renderComponent($$result, "UpdateProduct", $$UpdateProduct, { "product": product, "class": "astro-rvaksmwl" })}`)}</ul>`}`;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/products/MarketProductList.astro", void 0);

const $$Astro$1 = createAstro();
const $$CreateProduct = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CreateProduct;
  const { marketId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form class="create_product__form astro-wnxddvy5" method="POST"${addAttribute(actions.products.createProduct, "action")}> <input type="text" name="marketId"${addAttribute(marketId, "value")} hidden class="astro-wnxddvy5"> <button class="primary_button astro-wnxddvy5">Crear producto</button> </form> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/products/forms/CreateProduct.astro", void 0);

const $$Astro = createAstro();
const $$marketId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$marketId;
  const { marketId } = Astro2.params;
  if (!marketId) return;
  const market = await getMarketById(marketId);
  if (!market) return;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "class": "astro-ial3ywiu" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="update_market astro-ial3ywiu"> <section class="update_market__buttons astro-ial3ywiu"> ${renderComponent($$result2, "MarketLink", $$MarketLink, { "class": "astro-ial3ywiu" })} </section> <section class="update_market__content astro-ial3ywiu"> ${renderComponent($$result2, "UpdateMarket", $$UpdateMarket, { "market": market, "class": "astro-ial3ywiu" })} <div class="update_market__products astro-ial3ywiu"> ${renderComponent($$result2, "CreateProduct", $$CreateProduct, { "marketId": market.id, "class": "astro-ial3ywiu" })} ${renderComponent($$result2, "MarketProductList", $$MarketProductList, { "products": market.products, "class": "astro-ial3ywiu" })} </div> </section> </main>  ` })}`;
}, "C:/Users/leand/Proyectos/market-for-me/src/pages/admin/markets/[marketId].astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/pages/admin/markets/[marketId].astro";
const $$url = "/admin/markets/[marketId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$marketId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
