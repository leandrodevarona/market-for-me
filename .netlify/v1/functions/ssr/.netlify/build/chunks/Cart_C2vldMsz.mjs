import { c as createComponent, r as renderTemplate, i as defineScriptVars, e as renderSlot, d as addAttribute, m as maybeRenderHead, b as createAstro, a as renderComponent } from './astro/server_BYO_c3aR.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getProductsOnCart } from './cart_DELYUVf7.mjs';
import { $ as $$Icon } from './Icon_BDERPYzh.mjs';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$OpenModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$OpenModal;
  const { class: className, modalId, href } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<button id="open_modal"', "> ", " </button> <script>(function(){", '\n  const button = document.getElementById("open_modal");\n\n  button.addEventListener("click", () => {\n    if (href) {\n      Astro.redirect(href);\n    }\n\n    if (modalId) {\n      const dialog = document.getElementById(modalId);\n      if (dialog) {\n        console.log(dialog);\n        dialog.showModal();\n      }\n    }\n  });\n})();<\/script>'])), maybeRenderHead(), addAttribute(className, "class"), renderSlot($$result, $$slots["default"]), defineScriptVars({ modalId, href }));
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/buttons/OpenModal.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Cart = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cart;
  const products = await getProductsOnCart(Astro2);
  return renderTemplate`${renderComponent($$result, "OpenModal", $$OpenModal, { "modalId": "cart", "class": "cart astro-bru5lpaf" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:cart-outline", "size": 30, "class": "astro-bru5lpaf" })} ${maybeRenderHead()}<div class="cart_amount astro-bru5lpaf">${products?.length || 0}</div> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/Cart.astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/Cart.astro";
const $$url = undefined;

export { $$Cart as default, $$file as file, prerender, $$url as url };
