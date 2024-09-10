import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_B-0hZEPU.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Market for me" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="home"></main> ` })}`;
}, "C:/Users/leand/Proyectos/market-for-me/src/pages/index.astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
