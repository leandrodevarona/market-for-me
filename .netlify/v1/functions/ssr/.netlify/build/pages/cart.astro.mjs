import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent, b as createAstro } from '../chunks/astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { a as $$Modal, b as $$CartResume, c as $$CartListItems, $ as $$Layout } from '../chunks/Layout_B-0hZEPU.mjs';
import { $ as $$Currencies } from '../chunks/Currencies_Df8hR4o3.mjs';
import { $ as $$Icon } from '../chunks/Icon_Ch9NK6yf.mjs';
/* empty css                                 */
import { R as Routes } from '../chunks/routes_DG_8Jzi8.mjs';
import { a as actions } from '../chunks/_astro_actions_RIKXTNdc.mjs';
import { g as getCartItems, a as getCartSubtotal, C as CART_CONFIRMATION_KEY } from '../chunks/cart_Ddh2ty3s.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$GenerateInvoice = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$GenerateInvoice;
  const { disabled } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form id="generate_invoice" class="generate_invoice astro-m6qhy57o"> <button id="generate_invoice__button" type="submit"${addAttribute([[
    "generate_invoice__button",
    "primary_button",
    "centered_button"
  ], "astro-m6qhy57o"], "class:list")}${addAttribute(disabled, "disabled")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:wallet-bifold", "size": 25, "class": "astro-m6qhy57o" })} <span class="loader astro-m6qhy57o">Generar factura</span> </button> ${renderComponent($$result, "Currencies", $$Currencies, { "title": "Moneda con la que desea pagar", "class": "astro-m6qhy57o" })} <p class="astro-m6qhy57o"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:lightbulb-question", "size": 25, "color": "yellow", "class": "astro-m6qhy57o" })}
Se hará el cambio a esta moneda según la tasa de cambio actual.
</p> </form>  `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/forms/GenerateInvoice.astro", void 0);

const $$Astro$1 = createAstro();
const $$BuyConfirmationModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BuyConfirmationModal;
  const { open } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Modal", $$Modal, { "id": "buy_confirmation", "class": "buy_confirmation astro-kfqdgfzx", "open": open, "backHref": Routes.cart }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<form class="buy_confirmation__content astro-kfqdgfzx" method="POST"${addAttribute(Routes.home + actions.cart.completeBuy, "action")}> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:basket-check", "size": 100, "color": "green", "class": "astro-kfqdgfzx" })} <h3 class="astro-kfqdgfzx">¿Desea terminar su compra?</h3> <p class="astro-kfqdgfzx">
Si desea terminar su compra usted debe enviar por <strong class="astro-kfqdgfzx">Whatsapp</strong>
la factura descargada a este número:
</p> <span class="buy_confirmation__phone astro-kfqdgfzx">+53 59757731</span> <button${addAttribute([["buy_confirmation__button", "primary_button"], "astro-kfqdgfzx"], "class:list")}>
Terminar compra
</button> </form> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/modals/BuyConfirmationModal.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const cartItems = await getCartItems(Astro2);
  const subtotalByCurrency = await getCartSubtotal(Astro2);
  const itemsCount = cartItems?.length || 0;
  const params = Astro2.url.searchParams;
  const confirmation = Boolean(params.get(CART_CONFIRMATION_KEY));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mi carro de compras", "class": "astro-qsvkvazo" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="cart astro-qsvkvazo"> <section class="astro-qsvkvazo"> ${renderComponent($$result2, "CartResume", $$CartResume, { "itemsCount": itemsCount, "subtotalByCurrency": subtotalByCurrency, "class": "astro-qsvkvazo" })} </section> <section class="cart_actions astro-qsvkvazo"> ${renderComponent($$result2, "GenerateInvoice", $$GenerateInvoice, { "disabled": itemsCount <= 0, "class": "astro-qsvkvazo" })} </section> <section class="cart_items astro-qsvkvazo"> <h3 class="cart_items__title astro-qsvkvazo">Productos</h3> ${renderComponent($$result2, "CartListItems", $$CartListItems, { "cartItems": cartItems, "class": "astro-qsvkvazo" })} </section> ${renderComponent($$result2, "BuyConfirmationModal", $$BuyConfirmationModal, { "open": confirmation, "class": "astro-qsvkvazo" })} </main> ` })} 
f`;
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
