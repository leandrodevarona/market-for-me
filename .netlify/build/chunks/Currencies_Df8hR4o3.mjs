import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, b as createAstro } from './astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import 'clsx';
import { Currency } from '@prisma/client';
/* empty css                              */

const $$Astro = createAstro();
const $$Currencies = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Currencies;
  const { value, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<label class="currency astro-iepb7d6f">
Moneda
<select name="currency"${addAttribute(title, "title")} class="astro-iepb7d6f"> ${Object.values(Currency).map((currency) => renderTemplate`<option${addAttribute(currency, "value")}${addAttribute(currency === value, "selected")} class="astro-iepb7d6f"> ${currency} </option>`)} </select> </label> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/selects/Currencies.astro", void 0);

export { $$Currencies as $ };
