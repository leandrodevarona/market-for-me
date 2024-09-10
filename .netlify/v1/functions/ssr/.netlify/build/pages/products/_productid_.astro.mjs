import { c as createComponent, r as renderTemplate, f as defineScriptVars, a as renderComponent, d as addAttribute, m as maybeRenderHead, b as createAstro } from '../../chunks/astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_Q4VzFIBp.mjs';
import { d as db } from '../../chunks/server_DBUda-Za.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from '../../chunks/_astro_assets_B7JGV4pR.mjs';
/* empty css                                          */
import { $ as $$AddProductToCart } from '../../chunks/AddProductToCart_DrjrzFmU.mjs';
export { renderers } from '../../renderers.mjs';

async function getProductById(id) {
  try {
    const product = await db.product.findUnique({
      where: {
        id
      }
    });
    return product;
  } catch (error) {
    return null;
  }
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$ProductImageItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProductImageItem;
  const { id, imageId, imageUrl = "" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", "<li", ' class="product_image__item astro-jrxoc2ml"', "> ", " </li>  <script>(function(){", '\n  const liElem = document.getElementById(id);\n\n  if (liElem) {\n    liElem.addEventListener("click", () => {\n      const imageElem = document.getElementById(imageId);\n      if (imageElem) {\n        imageElem.src = imageUrl;\n      }\n    });\n  }\n})();<\/script>'])), maybeRenderHead(), addAttribute(id, "id"), addAttribute(-1, "tabindex"), renderComponent($$result, "Image", $$Image, { "src": imageUrl, "alt": "Product image thumbnail", "width": 60, "height": 60, "class": "astro-jrxoc2ml" }), defineScriptVars({ id, imageId, imageUrl }));
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/products/images/ProductImageItem.astro", void 0);

const $$Astro$1 = createAstro();
const $$ProductImageViewer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProductImageViewer;
  const { imageUrls } = Astro2.props;
  if (!imageUrls || imageUrls.length <= 0) return;
  return renderTemplate`${maybeRenderHead()}<div class="product_image__viewer astro-hha3qson"> <ul class="astro-hha3qson"> ${imageUrls.map((image) => renderTemplate`${renderComponent($$result, "ProductImageItem", $$ProductImageItem, { "id": image, "imageId": "product_image", "imageUrl": image, "class": "astro-hha3qson" })}`)} </ul> <section class="product_image astro-hha3qson"> ${renderComponent($$result, "Image", $$Image, { "id": "product_image", "src": imageUrls[0], "alt": "Product image", "width": 520, "height": 520, "class": "astro-hha3qson" })} </section> </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/products/images/ProductImageViewer.astro", void 0);

const $$Astro = createAstro();
const $$productId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$productId;
  const { productId } = Astro2.params;
  if (!productId) return;
  const product = await getProductById(productId);
  if (!product) return;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": product.name, "class": "astro-yq33zi5l" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="product astro-yq33zi5l"> <section class="astro-yq33zi5l"> ${renderComponent($$result2, "ProductImageViewer", $$ProductImageViewer, { "imageUrls": product.imageUrls, "class": "astro-yq33zi5l" })} </section> <section class="product_info astro-yq33zi5l"> <h1 class="astro-yq33zi5l">${product.name}</h1> <hr class="astro-yq33zi5l"> <span class="product_info__price astro-yq33zi5l"> ${product.price} ${product.currency} </span> <p class="product_info__description astro-yq33zi5l">${product.description}</p> ${renderComponent($$result2, "AddProductToCart", $$AddProductToCart, { "productId": product.id, "class": "astro-yq33zi5l" })} </section> </main> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/pages/products/[productId].astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/pages/products/[productId].astro";
const $$url = "/products/[productId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$productId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
