import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent, e as renderSlot, b as createAstro } from './astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { $ as $$Icon } from './Icon_Ch9NK6yf.mjs';
/* empty css                         */
import { g as getCartItems, a as getCartSubtotal } from './cart_aGo_O-Lf.mjs';
import 'clsx';
import { R as Routes } from './routes_DK5zeVL6.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_B7JGV4pR.mjs';
import { a as actions } from './_astro_actions_DKez3BaD.mjs';

const $$Astro$8 = createAstro();
const $$Modal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Modal;
  const { id, class: className, style, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog${addAttribute(id, "id")}${addAttribute((className ?? "") + " astro-4wnmn37f", "class")}${addAttribute(style, "style")}> <form class="modal_close astro-4wnmn37f" method="dialog"> <span class="astro-4wnmn37f">${title}</span> <button${addAttribute([["close_modal", "primary_button", "centered_button"], "astro-4wnmn37f"], "class:list")} type="submit"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:close", "size": 20, "class": "astro-4wnmn37f" })} </button> </form> <div class="modal_content astro-4wnmn37f"> ${renderSlot($$result, $$slots["default"])} </div> </dialog> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/Modal.astro", void 0);

const $$Astro$7 = createAstro();
const $$SlideOutModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SlideOutModal;
  const { id, position, title } = Astro2.props;
  const marginStyle = position === "left" ? "margin-right: auto" : "margin-left: auto";
  return renderTemplate`${renderComponent($$result, "Modal", $$Modal, { "id": id, "class": "slide_out__modal astro-u22yi5nn", "title": title, "style": marginStyle }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/SlideOutModal.astro", void 0);

const $$Astro$6 = createAstro();
const $$LinkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$LinkCard;
  const { class: className, href, role = "link" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([["link_card", className], "astro-thpmvig2"], "class:list")}${addAttribute(href, "href")}${addAttribute(role, "role")}> ${renderSlot($$result, $$slots["default"])} </a> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/LinkCard.astro", void 0);

const $$Astro$5 = createAstro();
const $$ProductImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ProductImage;
  const { class: className, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([["product_image", className], "astro-6gs56yg6"], "class:list")}> ${url ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": url, "alt": "Product image", "width": 400, "height": 400, "class": "astro-6gs56yg6" })}` : renderTemplate`<p class="astro-6gs56yg6">No hay imagen</p>`} </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/products/ProductImage.astro", void 0);

const $$Astro$4 = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { class: className, product } = Astro2.props;
  const defaultImage = product.imageUrls[0] || null;
  return renderTemplate`${renderComponent($$result, "LinkCard", $$LinkCard, { "class:list": [["product_card", className], "astro-xw2ntvlo"], "href": Routes.products(product.id), "role": "listitem" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductImage", $$ProductImage, { "url": defaultImage, "class": "astro-xw2ntvlo" })} ${maybeRenderHead()}<div class="product_card__info astro-xw2ntvlo"> <span class="astro-xw2ntvlo">${product.name}</span> <span class="product_card__priceInfo astro-xw2ntvlo"> ${product.price} ${product.currency} </span> </div> ${renderSlot($$result2, $$slots["default"])} ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/products/ProductCard.astro", void 0);

const $$Astro$3 = createAstro();
const $$DeleteProductFromCart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$DeleteProductFromCart;
  const { productId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form id="delete_product__fromcart" method="POST"${addAttribute(actions.cart.deleteProductFromCart, "action")} class="astro-5axtxni5"> <input type="text" name="productId"${addAttribute(productId, "value")} hidden class="astro-5axtxni5"> <button${addAttribute([["delete_product", "primary_button", "centered_button"], "astro-5axtxni5"], "class:list")} aria-label="Eliminar producto"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:delete", "size": 20, "class": "astro-5axtxni5" })} </button> </form> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/forms/DeleteProductFromCart.astro", void 0);

const $$Astro$2 = createAstro();
const $$IncrDecrProductFromCart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$IncrDecrProductFromCart;
  const { productId, quantity } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="incr_decr__product astro-apj6tukl"> <form method="POST"${addAttribute(actions.cart.incrDecrProductFromCart, "action")} class="astro-apj6tukl"> <input type="text" name="productId"${addAttribute(productId, "value")} hidden class="astro-apj6tukl"> <input type="text" name="action" value="DECR" hidden class="astro-apj6tukl"> <button${addAttribute([["primary_button", "centered_button"], "astro-apj6tukl"], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:minus", "size": 25, "class": "astro-apj6tukl" })} </button> </form> <span class="astro-apj6tukl">${quantity}</span> <form method="POST"${addAttribute(actions.cart.incrDecrProductFromCart, "action")} class="astro-apj6tukl"> <input type="text" name="productId"${addAttribute(productId, "value")} hidden class="astro-apj6tukl"> <input type="text" name="action" value="INCR" hidden class="astro-apj6tukl"> <button${addAttribute([["primary_button", "centered_button"], "astro-apj6tukl"], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:plus", "size": 25, "class": "astro-apj6tukl" })} </button> </form> </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/forms/IncrDecrProductFromCart.astro", void 0);

const $$Astro$1 = createAstro();
const $$CartItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CartItem;
  const { cartItem } = Astro2.props;
  const product = cartItem.product;
  return renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "class": "product_card__incart astro-tde67i6p", "product": product }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="product_card__actions astro-tde67i6p"> ${renderComponent($$result2, "DeleteProductFromCart", $$DeleteProductFromCart, { "productId": product.id, "class": "astro-tde67i6p" })} ${renderComponent($$result2, "IncrDecrProductFromCart", $$IncrDecrProductFromCart, { "productId": product.id, "quantity": cartItem.quantity, "class": "astro-tde67i6p" })} </div> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartItem.astro", void 0);

const $$CreateAndSendInvoice = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<form method="POST"${addAttribute(actions.invoices.createAndSendInvoice, "action")} class="astro-s47mtvl3"> <button type="submit"${addAttribute([["create_send__invoice", "primary_button"], "astro-s47mtvl3"], "class:list")}>
Terminar compra
</button> </form> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/forms/CreateAndSendInvoice.astro", void 0);

const $$Astro = createAstro();
const $$CartModal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CartModal;
  const cartItems = await getCartItems(Astro2);
  const subtotalByCurrency = await getCartSubtotal(Astro2);
  const itemsCount = cartItems?.length || 0;
  return renderTemplate`${renderComponent($$result, "SlideOutModal", $$SlideOutModal, { "id": "cart", "title": "Productos en el carro", "class": "astro-64dym5e2" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="cart_modal__content astro-64dym5e2"> ${cartItems && cartItems.length > 0 ? renderTemplate`<ul class="astro-64dym5e2"> ${cartItems.map((carItem) => renderTemplate`${renderComponent($$result2, "CartItem", $$CartItem, { "cartItem": carItem, "class": "astro-64dym5e2" })}`)} </ul>` : renderTemplate`<div class="cart_modal__noItems astro-64dym5e2"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:cart-off", "size": 100, "class": "astro-64dym5e2" })} <p class="astro-64dym5e2">No posees productos en el carro de compras.</p> </div>`} </section> <section class="cart_modal__actions astro-64dym5e2"> <div class="cart_resume astro-64dym5e2"> <span class="astro-64dym5e2">Subtotal (${itemsCount} productos)</span> <div class="cart_resume__subtotal astro-64dym5e2"> <span class="astro-64dym5e2">${subtotalByCurrency.USD}</span> <span class="astro-64dym5e2">${subtotalByCurrency.EUR}</span> <span class="astro-64dym5e2">${subtotalByCurrency.CUP}</span> </div> </div> ${cartItems && cartItems.length > 0 && renderTemplate`${renderComponent($$result2, "CreateAndSendInvoice", $$CreateAndSendInvoice, { "class": "astro-64dym5e2" })}`} </section> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartModal.astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartModal.astro";
const $$url = undefined;

export { $$ProductCard as $, $$CartModal as a, $$file as b, $$url as c };
