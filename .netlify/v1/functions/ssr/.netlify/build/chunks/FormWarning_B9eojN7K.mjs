import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, b as createAstro, a as renderComponent } from './astro/server_DNQ7agjQ.mjs';
import 'kleur/colors';
import 'clsx';
import { a as actions } from './_astro_actions_BNIfTu6q.mjs';
import { R as Routes } from './routes_DK5zeVL6.mjs';
/* empty css                         */
import { i as isInputError } from './shared_jip68GMR.mjs';
import { $ as $$Icon } from './GoogleSignin_B4lX6aU6.mjs';

const $$Astro = createAstro();
const $$GenericFormMarket = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GenericFormMarket;
  const result = Astro2.getActionResult(actions.createMarket);
  const inputErrors = isInputError(result?.error) ? result.error.fields : {};
  const { market } = Astro2.props;
  const isCreating = market === void 0;
  const contact = market?.contact;
  const action = isCreating ? actions.createMarket : actions.updateMarket;
  return renderTemplate`${maybeRenderHead()}<form class="generic_form__market astro-aaysv7cj" method="POST"${addAttribute(Routes.adminHome + action, "action")} enctype="multipart/form-data"> <input type="text" name="marketId"${addAttribute(market?.id, "value")} hidden class="astro-aaysv7cj"> <section class="astro-aaysv7cj"> <h4 class="astro-aaysv7cj">Información general</h4> <label class="astro-aaysv7cj">
Nombre
<input class="primary_text__input astro-aaysv7cj" required type="text" name="name"${addAttribute(30, "maxlength")}${addAttribute(market?.name, "value")}> </label> ${inputErrors.name && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.name.join(",")}</p>`} <label class="astro-aaysv7cj">
Descripción
<textarea class="primary_text__input astro-aaysv7cj" name="description"${addAttribute(100, "maxlength")}>${market?.description}</textarea> </label> ${inputErrors.description && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.description.join(",")}</p>`} <label class="astro-aaysv7cj">
Imagen de presentación
<input class="primary_text__input astro-aaysv7cj" type="file" name="image" accept="image/*"> </label> ${inputErrors.image && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.image.join(",")}</p>`} </section> <section class="astro-aaysv7cj"> <h4 class="astro-aaysv7cj">Contacto</h4> <label class="astro-aaysv7cj">
Dirección
<input class="primary_text__input astro-aaysv7cj" type="text" name="address"${addAttribute(100, "maxlength")}${addAttribute(contact?.address, "value")}> </label> ${inputErrors.address && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.address.join(",")}</p>`} <label class="astro-aaysv7cj">
Teléfono 1
<input class="primary_text__input astro-aaysv7cj" type="tel" name="phone1"${addAttribute(20, "maxlength")}${addAttribute(contact?.phone1, "value")}> </label> ${inputErrors.phone1 && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.phone1.join(",")}</p>`} <label class="astro-aaysv7cj">
Teléfono 2
<input class="primary_text__input astro-aaysv7cj" type="tel" name="phone2"${addAttribute(20, "maxlength")}${addAttribute(contact?.phone2, "value")}> </label> ${inputErrors.phone2 && renderTemplate`<p class="error astro-aaysv7cj">${inputErrors.phone2.join(",")}</p>`} </section> <button class="primary_button astro-aaysv7cj">Publicar mercado</button> </form> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/forms/GenericFormMarket.astro", void 0);

const $$FormWarning = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<p class="market_form__warning astro-6v3ixbzp"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:lightbulb-question-outline", "color": "orange", "size": 30, "class": "astro-6v3ixbzp" })}
Para actualizar los cambios en su mercado debe presionar "Publicar mercado". Al
  cambiar alguno de sus productos su mercado no se actualizará. <br class="astro-6v3ixbzp">
Después de presionar "Publicar mercado", debe esperar algunos minutos a que el
  mercado se publique y actualize correctamente.
</p> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/warnings/FormWarning.astro", void 0);

export { $$GenericFormMarket as $, $$FormWarning as a };
