import { c as createComponent, r as renderTemplate, f as defineScriptVars, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderComponent, e as renderSlot, g as defineStyleVars, h as renderHead } from './astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Icon } from './Icon_Ch9NK6yf.mjs';
/* empty css                         */
import { g as getCartItems, a as getCartSubtotal } from './cart_Ddh2ty3s.mjs';
import { R as Routes } from './routes_DG_8Jzi8.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_B7JGV4pR.mjs';
import { a as actions } from './_astro_actions_RIKXTNdc.mjs';
import { Currency } from '@prisma/client';
import $$GoogleSignin from './GoogleSignin_eyOKCFtu.mjs';
import $$Cart from './Cart_CCsZfjSr.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$e = createAstro();
const $$ModalOpener = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$ModalOpener;
  const { menuId, open: openMenu } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<script>(function(){", "\n  if (menuId) {\n    const dialog = document.getElementById(menuId);\n    if (dialog) {\n      if (openMenu) {\n        dialog.showModal();\n      } else {\n        dialog.close();\n      }\n\n      return () => dialog.close();\n    }\n  }\n})();<\/script>"])), defineScriptVars({ menuId, openMenu }));
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/ModalOpener.astro", void 0);

const $$Astro$d = createAstro();
const $$CloseModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$CloseModal;
  const { backHref } = Astro2.props;
  return renderTemplate`${backHref ? renderTemplate`${maybeRenderHead()}<a id="close_modal"${addAttribute([["close_modal", "primary_button", "centered_button"], "astro-jqy3ju3j"], "class:list")} role="button"${addAttribute(backHref, "href")}>${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:close", "size": 20, "class": "astro-jqy3ju3j" })}</a>` : renderTemplate`<button id="close_modal"${addAttribute([["close_modal", "primary_button", "centered_button"], "astro-jqy3ju3j"], "class:list")} type="submit">${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:close", "size": 20, "class": "astro-jqy3ju3j" })}</button>`}`;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/buttons/CloseModal.astro", void 0);

const $$Astro$c = createAstro();
const $$Modal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Modal;
  const { id, class: className, style, open, title, backHref } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog${addAttribute(id, "id")}${addAttribute((className ?? "") + " astro-4wnmn37f", "class")}${addAttribute(style, "style")}> ${renderComponent($$result, "ModalOpener", $$ModalOpener, { "menuId": id, "open": open || false, "class": "astro-4wnmn37f" })} <form class="modal_close astro-4wnmn37f" method="dialog"> <span class="astro-4wnmn37f">${title}</span> ${renderComponent($$result, "CloseModal", $$CloseModal, { "backHref": backHref, "class": "astro-4wnmn37f" })} </form> <div class="modal_content astro-4wnmn37f"> ${renderSlot($$result, $$slots["default"])} </div> </dialog> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/Modal.astro", void 0);

const $$Astro$b = createAstro();
const $$SlideOutModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$SlideOutModal;
  const { id, position, title } = Astro2.props;
  const marginStyle = position === "left" ? "margin-right: auto" : "margin-left: auto";
  return renderTemplate`${renderComponent($$result, "Modal", $$Modal, { "id": id, "class": "slide_out__modal astro-u22yi5nn", "title": title, "style": marginStyle }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/SlideOutModal.astro", void 0);

const $$Astro$a = createAstro();
const $$LinkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$LinkCard;
  const { class: className, href, role = "link" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([["link_card", className], "astro-thpmvig2"], "class:list")}${addAttribute(href, "href")}${addAttribute(role, "role")}> ${renderSlot($$result, $$slots["default"])} </a> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/LinkCard.astro", void 0);

const $$Astro$9 = createAstro();
const $$ProductImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$ProductImage;
  const { class: className, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([["product_image", className], "astro-6gs56yg6"], "class:list")}> ${url ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": url, "alt": "Product image", "width": 400, "height": 400, "class": "astro-6gs56yg6" })}` : renderTemplate`<p class="astro-6gs56yg6">No hay imagen</p>`} </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/products/ProductImage.astro", void 0);

const $$Astro$8 = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { class: className, product } = Astro2.props;
  const defaultImage = product.imageUrls[0] || null;
  return renderTemplate`${renderComponent($$result, "LinkCard", $$LinkCard, { "class:list": [["product_card", className], "astro-xw2ntvlo"], "href": Routes.products(product.id), "role": "listitem" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductImage", $$ProductImage, { "url": defaultImage, "class": "astro-xw2ntvlo" })} ${maybeRenderHead()}<div class="product_card__info astro-xw2ntvlo"> <span class="astro-xw2ntvlo">${product.name}</span> <span class="product_card__priceInfo astro-xw2ntvlo"> ${product.price} ${product.currency} </span> </div> ${renderSlot($$result2, $$slots["default"])} ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/products/ProductCard.astro", void 0);

const $$Astro$7 = createAstro();
const $$DeleteProductFromCart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$DeleteProductFromCart;
  const { productId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form id="delete_product__fromcart" method="POST"${addAttribute(actions.cart.deleteProductFromCart, "action")} class="astro-5axtxni5"> <input type="text" name="productId"${addAttribute(productId, "value")} hidden class="astro-5axtxni5"> <button${addAttribute([["delete_product", "primary_button", "centered_button"], "astro-5axtxni5"], "class:list")} aria-label="Eliminar producto"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:delete", "size": 20, "class": "astro-5axtxni5" })} </button> </form> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/forms/DeleteProductFromCart.astro", void 0);

const $$Astro$6 = createAstro();
const $$IncrDecrProductFromCart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$IncrDecrProductFromCart;
  const { productId, quantity } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="incr_decr__product astro-apj6tukl"> <form method="POST"${addAttribute(actions.cart.incrDecrProductFromCart, "action")} class="astro-apj6tukl"> <input type="text" name="productId"${addAttribute(productId, "value")} hidden class="astro-apj6tukl"> <input type="text" name="action" value="DECR" hidden class="astro-apj6tukl"> <button${addAttribute([["primary_button", "centered_button"], "astro-apj6tukl"], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:minus", "size": 25, "class": "astro-apj6tukl" })} </button> </form> <span class="astro-apj6tukl">${quantity}</span> <form method="POST"${addAttribute(actions.cart.incrDecrProductFromCart, "action")} class="astro-apj6tukl"> <input type="text" name="productId"${addAttribute(productId, "value")} hidden class="astro-apj6tukl"> <input type="text" name="action" value="INCR" hidden class="astro-apj6tukl"> <button${addAttribute([["primary_button", "centered_button"], "astro-apj6tukl"], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:plus", "size": 25, "class": "astro-apj6tukl" })} </button> </form> </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/forms/IncrDecrProductFromCart.astro", void 0);

const $$Astro$5 = createAstro();
const $$CartItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$CartItem;
  const { cartItem } = Astro2.props;
  const product = cartItem.product;
  return renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "class": "product_card__incart astro-tde67i6p", "product": product }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="product_card__actions astro-tde67i6p"> ${renderComponent($$result2, "DeleteProductFromCart", $$DeleteProductFromCart, { "productId": product.id, "class": "astro-tde67i6p" })} ${renderComponent($$result2, "IncrDecrProductFromCart", $$IncrDecrProductFromCart, { "productId": product.id, "quantity": cartItem.quantity, "class": "astro-tde67i6p" })} </div> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartItem.astro", void 0);

const $$Astro$4 = createAstro();
const $$CartListItems = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CartListItems;
  const { cartItems } = Astro2.props;
  return renderTemplate`${cartItems && cartItems.length > 0 ? renderTemplate`${maybeRenderHead()}<ul class="astro-kwwljavn">${cartItems.map((carItem) => renderTemplate`${renderComponent($$result, "CartItem", $$CartItem, { "cartItem": carItem, "class": "astro-kwwljavn" })}`)}</ul>` : renderTemplate`<div class="cart_modal__noItems astro-kwwljavn">${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:cart-off", "size": 100, "class": "astro-kwwljavn" })}<p class="astro-kwwljavn">No posees productos en el carro de compras.</p></div>`}`;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartListItems.astro", void 0);

const $$Astro$3 = createAstro();
const $$CartResume = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CartResume;
  const { itemsCount, subtotalByCurrency } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="cart_resume astro-au3vpgvh"> <span class="astro-au3vpgvh">
Subtotal (${itemsCount} ${itemsCount > 1 ? "productos" : "producto"})
</span> <div class="cart_resume__subtotal astro-au3vpgvh"> ${Object.values(Currency).map((currency) => renderTemplate`<span class="astro-au3vpgvh">${subtotalByCurrency[currency]}</span>`)} </div> </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartResume.astro", void 0);

const $$Astro$2 = createAstro();
const $$CartModal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CartModal;
  const cartItems = await getCartItems(Astro2);
  const subtotalByCurrency = await getCartSubtotal(Astro2);
  const itemsCount = cartItems?.length || 0;
  return renderTemplate`${renderComponent($$result, "SlideOutModal", $$SlideOutModal, { "id": "cart", "title": "Productos en el carro", "class": "astro-64dym5e2" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="cart_modal__content astro-64dym5e2"> ${renderComponent($$result2, "CartListItems", $$CartListItems, { "cartItems": cartItems, "class": "astro-64dym5e2" })} </section> ${cartItems && cartItems.length > 0 && renderTemplate`<section class="cart_modal__actions astro-64dym5e2"> ${renderComponent($$result2, "CartResume", $$CartResume, { "itemsCount": itemsCount, "subtotalByCurrency": subtotalByCurrency, "class": "astro-64dym5e2" })} <a class="primary_button astro-64dym5e2"${addAttribute(Routes.cart, "href")}>
Ir al carro
</a> </section>`}` })} `;
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

export { $$Layout as $, $$Modal as a, $$CartResume as b, $$CartListItems as c, $$ProductCard as d };
