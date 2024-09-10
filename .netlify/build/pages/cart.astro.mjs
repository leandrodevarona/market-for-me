import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent, b as createAstro } from '../chunks/astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { a as $$CartResume, b as $$CartListItems, $ as $$Layout } from '../chunks/Layout_CaeOUkBe.mjs';
import { $ as $$Currencies } from '../chunks/Currencies_Df8hR4o3.mjs';
import { $ as $$Icon } from '../chunks/Icon_Ch9NK6yf.mjs';
/* empty css                                 */
import { g as getCartItems, a as getCartSubtotal } from '../chunks/cart_CeCDbuUy.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$GenerateInvoice = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$GenerateInvoice;
  const { disabled } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form id="generate_invoice" class="generate_invoice astro-m6qhy57o"> <button type="submit"${addAttribute([[
    "generate_invoice__button",
    "primary_button",
    "centered_button"
  ], "astro-m6qhy57o"], "class:list")}${addAttribute(disabled, "disabled")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:wallet-bifold", "size": 25, "class": "astro-m6qhy57o" })} <span class="astro-m6qhy57o">Generar factura</span> </button> ${renderComponent($$result, "Currencies", $$Currencies, { "title": "Moneda con la que desea pagar", "class": "astro-m6qhy57o" })} </form>  `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/forms/GenerateInvoice.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const cartItems = await getCartItems(Astro2);
  const subtotalByCurrency = await getCartSubtotal(Astro2);
  const itemsCount = cartItems?.length || 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mi carro de compras", "class": "astro-qsvkvazo" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="cart astro-qsvkvazo"> <section class="astro-qsvkvazo"> ${renderComponent($$result2, "CartResume", $$CartResume, { "itemsCount": itemsCount, "subtotalByCurrency": subtotalByCurrency, "class": "astro-qsvkvazo" })} </section> <section class="cart_actions astro-qsvkvazo"> ${renderComponent($$result2, "GenerateInvoice", $$GenerateInvoice, { "disabled": itemsCount <= 0, "class": "astro-qsvkvazo" })} </section> <section class="cart_items astro-qsvkvazo"> <h3 class="cart_items__title astro-qsvkvazo">Productos</h3> ${renderComponent($$result2, "CartListItems", $$CartListItems, { "cartItems": cartItems, "class": "astro-qsvkvazo" })} </section> </main>  ` })}`;
}, "C:/Users/leand/Proyectos/market-for-me/src/pages/cart/index.astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/pages/cart/index.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
