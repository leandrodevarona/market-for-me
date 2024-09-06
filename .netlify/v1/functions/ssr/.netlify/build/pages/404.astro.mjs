import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CxbHblSA.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const { error } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page not found", "header": false, "class": "astro-zetdm5md" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="page_404 astro-zetdm5md"> <h1 class="astro-zetdm5md">Esta página no existe o aún no se ha terminado de crear</h1> <code class="astro-zetdm5md">${error}</code> </main> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/pages/404.astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
