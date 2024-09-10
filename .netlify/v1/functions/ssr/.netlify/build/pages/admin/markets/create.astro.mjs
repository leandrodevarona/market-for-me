import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent } from '../../../chunks/astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_DiFKTT-7.mjs';
import { $ as $$GenericFormMarket, a as $$PublishMarket } from '../../../chunks/PublishMarket_BxS2S2nT.mjs';
/* empty css                                       */
import { $ as $$Icon } from '../../../chunks/Icon_Ch9NK6yf.mjs';
export { renderers } from '../../../renderers.mjs';

const $$CreateMarket = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="create_market__form astro-vkwwdw4c"> ${renderComponent($$result, "GenericFormMarket", $$GenericFormMarket, { "class": "astro-vkwwdw4c" })} ${renderComponent($$result, "PublishMarket", $$PublishMarket, { "class": "astro-vkwwdw4c" })} </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/forms/CreateMarket.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "class": "astro-n4xbbg6r" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="create_market astro-n4xbbg6r"> <section class="astro-n4xbbg6r"> ${renderComponent($$result2, "CreateMarket", $$CreateMarket, { "class": "astro-n4xbbg6r" })} </section> <section class="create_market__products astro-n4xbbg6r"> <div class="astro-n4xbbg6r"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:lightbulb-alert", "size": 30, "color": "yellow", "class": "astro-n4xbbg6r" })} <p class="astro-n4xbbg6r">Cree el mercado para poder agregar sus productos.</p> </div> </section> </main> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/pages/admin/markets/create/index.astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/pages/admin/markets/create/index.astro";
const $$url = "/admin/markets/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
