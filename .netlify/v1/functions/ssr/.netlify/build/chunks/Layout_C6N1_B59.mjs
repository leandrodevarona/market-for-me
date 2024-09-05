import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent, e as renderSlot, b as createAstro, g as defineStyleVars, h as renderHead } from './astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { $ as $$Icon } from './Icon_Ch9NK6yf.mjs';
/* empty css                         */
import $$GoogleSignin from './GoogleSignin_NV_RehS7.mjs';
import 'clsx';
import $$Cart from './Cart_CO78hU_R.mjs';

const $$Astro$3 = createAstro();
const $$Modal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Modal;
  const { id, class: className, style, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog${addAttribute(id, "id")}${addAttribute((className ?? "") + " astro-4wnmn37f", "class")}${addAttribute(style, "style")}> <form class="modal_close astro-4wnmn37f" method="dialog"> <span class="astro-4wnmn37f">${title}</span> <button${addAttribute([["close_modal", "primary_button", "centered_button"], "astro-4wnmn37f"], "class:list")} type="submit"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:close", "size": 20, "class": "astro-4wnmn37f" })} </button> </form> <div class="modal_content astro-4wnmn37f"> ${renderSlot($$result, $$slots["default"])} </div> </dialog> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/Modal.astro", void 0);

const $$Astro$2 = createAstro();
const $$SlideOutModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SlideOutModal;
  const { id, position, title } = Astro2.props;
  const marginStyle = position === "left" ? "margin-right: auto" : "margin-left: auto";
  return renderTemplate`${renderComponent($$result, "Modal", $$Modal, { "id": id, "class": "slide_out__modal astro-u22yi5nn", "title": title, "style": marginStyle }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/SlideOutModal.astro", void 0);

const $$CartModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "SlideOutModal", $$SlideOutModal, { "id": "cart", "title": "Productos en el carro" }, { "default": ($$result2) => renderTemplate` Carrito ` })}`;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartModal.astro", void 0);

const $$Astro$1 = createAstro();
const $$SkeletonBox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SkeletonBox;
  const { class: className, width, height } = Astro2.props;
  const $$definedVars = defineStyleVars([{ width, height }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([["skeleton_box", className], "astro-r3oqxinr"], "class:list")}${addAttribute($$definedVars, "style")}></div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/loaders/SkeletonBox.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="header astro-3ef6ksr2"> <section class="astro-3ef6ksr2"></section> <section class="header_rigth astro-3ef6ksr2"> ${renderComponent($$result, "GoogleSignin", $$GoogleSignin, { "server:defer": true, "server:component-directive": "defer", "server:component-path": "C:/Users/leand/Proyectos/market-for-me/src/components/auth/buttons/GoogleSignin.astro", "server:component-export": "default", "class": "astro-3ef6ksr2" }, { "fallback": ($$result2) => renderTemplate`${renderComponent($$result2, "SkeletonBox", $$SkeletonBox, { "slot": "fallback", "width": "180px", "class": "astro-3ef6ksr2" })}` })} ${renderComponent($$result, "Cart", $$Cart, { "server:defer": true, "server:component-directive": "defer", "server:component-path": "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/Cart.astro", "server:component-export": "default", "class": "astro-3ef6ksr2" }, { "fallback": ($$result2) => renderTemplate`${renderComponent($$result2, "SkeletonBox", $$SkeletonBox, { "slot": "fallback", "width": "50px", "height": "30px", "class": "astro-3ef6ksr2" })}` })} </section> </header> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/Header.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Astro description", header = true } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${header && renderTemplate`${renderComponent($$result, "Header", $$Header, {})}`} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "CartModal", $$CartModal, {})} </body></html>`;
}, "C:/Users/leand/Proyectos/market-for-me/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
