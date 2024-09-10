import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent, b as createAstro } from './astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { $ as $$Icon } from './Icon_Ch9NK6yf.mjs';
import { a as actions } from './_astro_actions_RIKXTNdc.mjs';
/* empty css                              */

const $$Astro = createAstro();
const $$AddProductToCart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AddProductToCart;
  const { productId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form id="add_product__tocart" method="POST"${addAttribute(actions.cart.addProductToCart, "action")} class="astro-7lum2p5d"> <input type="text" name="productId"${addAttribute(productId, "value")} hidden class="astro-7lum2p5d"> <button${addAttribute([["add_product", "primary_button", "centered_button"], "astro-7lum2p5d"], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:cart", "size": 20, "class": "astro-7lum2p5d" })} <span class="astro-7lum2p5d">Añadir</span> </button> </form> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/forms/AddProductToCart.astro", void 0);

export { $$AddProductToCart as $ };
