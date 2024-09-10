import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, b as createAstro, a as renderComponent } from './astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import 'clsx';
import { a as actions } from './_astro_actions_hWnmEwMn.mjs';
/* empty css                         */
import { i as isInputError } from './shared_DsA9hi-M.mjs';
import { $ as $$Icon } from './Icon_Ch9NK6yf.mjs';

const $$Astro = createAstro();
const $$GenericFormMarket = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GenericFormMarket;
  const { market } = Astro2.props;
  const isCreating = market === void 0;
  const contact = market?.contact;
  const action = isCreating ? actions.markets.createMarket : actions.markets.updateMarket;
  const result = Astro2.getActionResult(action);
  const inputErrors = isInputError(result?.error) ? result.error.fields : {};
  return renderTemplate`${maybeRenderHead()}<form id="generic_form__market" class="generic_form__market astro-aaysv7cj" method="POST"${addAttribute(action, "action")} enctype="multipart/form-data"> <input type="text" name="marketId"${addAttribute(market?.id, "value")} hidden class="astro-aaysv7cj"> <section class="astro-aaysv7cj"> <h4 class="astro-aaysv7cj">Información general</h4> <label class="astro-aaysv7cj">
Nombre
<input class="primary_text__input astro-aaysv7cj" required type="text" name="name"${addAttribute(30, "maxlength")}${addAttribute(market?.name, "value")}> </label> ${inputErrors.name && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.name.join(",")}</p>`} <label class="astro-aaysv7cj">
Descripción
<textarea class="primary_text__input astro-aaysv7cj" name="description"${addAttribute(100, "maxlength")}>        ${market?.description}
      </textarea> </label> ${inputErrors.description && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.description.join(",")}</p>`} <label class="astro-aaysv7cj">
Imagen de presentación
<input class="primary_text__input astro-aaysv7cj" type="file" name="image" accept="image/*"> </label> ${inputErrors.image && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.image.join(",")}</p>`} </section> <section class="astro-aaysv7cj"> <h4 class="astro-aaysv7cj">Contacto</h4> <label class="astro-aaysv7cj">
Dirección
<input class="primary_text__input astro-aaysv7cj" type="text" name="address"${addAttribute(100, "maxlength")}${addAttribute(contact?.address, "value")}> </label> ${inputErrors.address && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.address.join(",")}</p>`} <label class="astro-aaysv7cj">
Teléfono 1
<input class="primary_text__input astro-aaysv7cj" type="tel" name="phone1"${addAttribute(20, "maxlength")}${addAttribute(contact?.phone1, "value")}> </label> ${inputErrors.phone1 && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.phone1.join(",")}</p>`} <label class="astro-aaysv7cj">
Teléfono 2
<input class="primary_text__input astro-aaysv7cj" type="tel" name="phone2"${addAttribute(20, "maxlength")}${addAttribute(contact?.phone2, "value")}> </label> ${inputErrors.phone2 && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.phone2.join(",")}</p>`} </section> </form> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/forms/GenericFormMarket.astro", void 0);

const $$PublishMarket = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button${addAttribute([["publish_market", "primary_button", "centered_button"], "astro-63qkfpns"], "class:list")} type="submit" form="generic_form__market"> <span class="astro-63qkfpns">Publicar mercado</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:publish", "size": 20, "class": "astro-63qkfpns" })} </button> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/forms/buttons/PublishMarket.astro", void 0);

export { $$GenericFormMarket as $, $$PublishMarket as a };
