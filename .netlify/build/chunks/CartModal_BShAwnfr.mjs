import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent, e as renderSlot, b as createAstro } from './astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { $ as $$Icon } from './Icon_Ch9NK6yf.mjs';
/* empty css                         */
import { g as getProductsOnCart } from './cart_DELYUVf7.mjs';
import 'clsx';
import { R as Routes } from './routes_DK5zeVL6.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_B7JGV4pR.mjs';
import { a as actions } from './_astro_actions_ClBqUssH.mjs';

const $$Astro$7 = createAstro();
const $$Modal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Modal;
  const { id, class: className, style, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog${addAttribute(id, "id")}${addAttribute((className ?? "") + " astro-4wnmn37f", "class")}${addAttribute(style, "style")}> <form class="modal_close astro-4wnmn37f" method="dialog"> <span class="astro-4wnmn37f">${title}</span> <button${addAttribute([["close_modal", "primary_button", "centered_button"], "astro-4wnmn37f"], "class:list")} type="submit"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:close", "size": 20, "class": "astro-4wnmn37f" })} </button> </form> <div class="modal_content astro-4wnmn37f"> ${renderSlot($$result, $$slots["default"])} </div> </dialog> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/Modal.astro", void 0);

const $$Astro$6 = createAstro();
const $$SlideOutModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$SlideOutModal;
  const { id, position, title } = Astro2.props;
  const marginStyle = position === "left" ? "margin-right: auto" : "margin-left: auto";
  return renderTemplate`${renderComponent($$result, "Modal", $$Modal, { "id": id, "class": "slide_out__modal astro-u22yi5nn", "title": title, "style": marginStyle }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/modals/SlideOutModal.astro", void 0);

const $$Astro$5 = createAstro();
const $$LinkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LinkCard;
  const { class: className, href, role = "link" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([["link_card", className], "astro-thpmvig2"], "class:list")}${addAttribute(href, "href")}${addAttribute(role, "role")}> ${renderSlot($$result, $$slots["default"])} </a> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/LinkCard.astro", void 0);

const $$Astro$4 = createAstro();
const $$ProductImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ProductImage;
  const { class: className, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([["product_image", className], "astro-6gs56yg6"], "class:list")}> ${url ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": url, "alt": "Product image", "width": 400, "height": 400, "class": "astro-6gs56yg6" })}` : renderTemplate`<p class="astro-6gs56yg6">No hay imagen</p>`} </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/products/ProductImage.astro", void 0);

const $$Astro$3 = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { class: className, product } = Astro2.props;
  const defaultImage = product.imageUrls[0] || null;
  return renderTemplate`${renderComponent($$result, "LinkCard", $$LinkCard, { "class:list": [["product_card", className], "astro-xw2ntvlo"], "href": Routes.products(product.id), "role": "listitem" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductImage", $$ProductImage, { "url": defaultImage, "class": "astro-xw2ntvlo" })} ${maybeRenderHead()}<div class="product_card__info astro-xw2ntvlo"> <span class="astro-xw2ntvlo">${product.name}</span> <span class="product_card__priceInfo astro-xw2ntvlo">${product.price} ${product.currency} </span> </div> ${renderSlot($$result2, $$slots["default"])} ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/products/ProductCard.astro", void 0);

const $$Astro$2 = createAstro();
const $$DeleteProductFromCart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DeleteProductFromCart;
  const { productId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form id="delete_product__fromcart" method="POST"${addAttribute(actions.cart.deleteProductFromCart, "action")} class="astro-5axtxni5"> <input type="text" name="productId"${addAttribute(productId, "value")} hidden class="astro-5axtxni5"> <button${addAttribute([["delete_product", "primary_button", "centered_button"], "astro-5axtxni5"], "class:list")} aria-label="Eliminar producto"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:delete", "size": 20, "class": "astro-5axtxni5" })} </button> </form> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/forms/DeleteProductFromCart.astro", void 0);

const $$Astro$1 = createAstro();
const $$CartItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CartItem;
  const { product } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "class": "product_card__incart astro-tde67i6p", "product": product }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="product_card__actions astro-tde67i6p"> ${renderComponent($$result2, "DeleteProductFromCart", $$DeleteProductFromCart, { "productId": product.id, "class": "astro-tde67i6p" })} </div> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartItem.astro", void 0);

const $$Astro = createAstro();
const $$CartModal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CartModal;
  const products = await getProductsOnCart(Astro2);
  return renderTemplate`${renderComponent($$result, "SlideOutModal", $$SlideOutModal, { "id": "cart", "title": "Productos en el carro", "class": "astro-64dym5e2" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="cart_modal__content astro-64dym5e2"> ${products && products.length > 0 ? renderTemplate`<ul class="astro-64dym5e2"> ${products.map((product) => renderTemplate`${renderComponent($$result2, "CartItem", $$CartItem, { "product": product, "class": "astro-64dym5e2" })}`)} </ul>` : renderTemplate`<p class="astro-64dym5e2">No posees productos en el carro de compras.</p>`} </div> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartModal.astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/CartModal.astro";
const $$url = undefined;

export { $$ProductCard as $, $$CartModal as a, $$file as b, $$url as c };
