import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent, b as createAstro } from '../../chunks/astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from '../../chunks/_astro_assets_B7JGV4pR.mjs';
/* empty css                                         */
import 'clsx';
import { c as $$ProductCard, $ as $$Layout } from '../../chunks/Layout_Q4VzFIBp.mjs';
import { $ as $$AddProductToCart } from '../../chunks/AddProductToCart_DrjrzFmU.mjs';
import { g as getMarketById } from '../../chunks/markets_C8fXSG5n.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$4 = createAstro();
const $$MarketImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$MarketImage;
  const { class: className, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([["market_image", className], "astro-ylunabln"], "class:list")}> ${url ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": url, "alt": "Market image", "width": 1600, "height": 400, "class": "astro-ylunabln" })}` : renderTemplate`<p class="astro-ylunabln">No hay imagen</p>`} </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/presentation/MarketImage.astro", void 0);

const $$Astro$3 = createAstro();
const $$MarketContacts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MarketContacts;
  const {
    contact: { phone1, phone2, address }
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="market_contacts astro-o7x23mj7"> <h2 class="astro-o7x23mj7">Contacto</h2> <ol class="market_contacts__list astro-o7x23mj7"> <li class="astro-o7x23mj7"> ${phone1 && renderTemplate`<span class="astro-o7x23mj7"> <strong class="astro-o7x23mj7">Teléfono 1:</strong> ${phone1} </span>`} </li> <li class="astro-o7x23mj7"> ${phone2 && renderTemplate`<span class="astro-o7x23mj7"> <strong class="astro-o7x23mj7">Teléfono 2:</strong> ${phone2} </span>`} </li> <li class="astro-o7x23mj7"> ${address && renderTemplate`<span class="astro-o7x23mj7"> <strong class="astro-o7x23mj7">Dirección:</strong> ${address} </span>`} </li> </ol> </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/presentation/MarketContacts.astro", void 0);

const $$Astro$2 = createAstro();
const $$MarketHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MarketHeader;
  const {
    market: { name, description, imageUrl, contact }
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="header_market astro-3tal5cys"> ${renderComponent($$result, "MarketImage", $$MarketImage, { "url": imageUrl, "class": "astro-3tal5cys" })} <section class="header_market__info astro-3tal5cys"> <div class="header_market__generalInfo astro-3tal5cys"> <h1 class="astro-3tal5cys">${name}</h1> ${description && renderTemplate`<p class="astro-3tal5cys">${description}</p>`} </div> ${contact && renderTemplate`${renderComponent($$result, "MarketContacts", $$MarketContacts, { "contact": contact, "class": "astro-3tal5cys" })}`} </section> </header> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/presentation/MarketHeader.astro", void 0);

const $$Astro$1 = createAstro();
const $$MarketProductList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MarketProductList;
  const { products } = Astro2.props;
  return renderTemplate`${(!products || products.length <= 0) && renderTemplate`${maybeRenderHead()}<div class="astro-wdoxjfmw">No products</div>`}<ul class="astro-wdoxjfmw">${products.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "product": product, "class": "astro-wdoxjfmw" }, { "default": ($$result2) => renderTemplate`<div class="product_card__actions astro-wdoxjfmw">${renderComponent($$result2, "AddProductToCart", $$AddProductToCart, { "productId": product.id, "class": "astro-wdoxjfmw" })}</div>` })}`)}</ul>`;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/products/MarketProductList.astro", void 0);

const $$Astro = createAstro();
const $$marketId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$marketId;
  const { marketId } = Astro2.params;
  if (!marketId) return;
  const market = await getMarketById(marketId);
  if (!market) return;
  const marketProducts = market.products;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": market.name, "description": market.description, "class": "astro-z3yi7gcq" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="market astro-z3yi7gcq"> ${renderComponent($$result2, "MarketHeader", $$MarketHeader, { "market": market, "class": "astro-z3yi7gcq" })} ${renderComponent($$result2, "MarketProductList", $$MarketProductList, { "products": marketProducts, "class": "astro-z3yi7gcq" })} </main> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/pages/markets/[marketId].astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/pages/markets/[marketId].astro";
const $$url = "/markets/[marketId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$marketId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
