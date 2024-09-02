import { c as createComponent, f as defineStyleVars, r as renderTemplate, m as maybeRenderHead, d as addAttribute, b as createAstro, a as renderComponent, g as renderHead, e as renderSlot } from './astro/server_DNQ7agjQ.mjs';
import 'kleur/colors';
import { a as $$GoogleSignin } from './GoogleSignin_B4lX6aU6.mjs';
/* empty css                         */
import 'clsx';

const $$Astro$1 = createAstro();
const $$SkeletonBox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SkeletonBox;
  const { class: className, width, height } = Astro2.props;
  const $$definedVars = defineStyleVars([{ width, height }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([["skeleton_box", className], "astro-r3oqxinr"], "class:list")}${addAttribute($$definedVars, "style")}></div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/loaders/SkeletonBox.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="header astro-3ef6ksr2"> <section class="astro-3ef6ksr2"></section> <section class="astro-3ef6ksr2"> ${renderComponent($$result, "GoogleSignin", $$GoogleSignin, { "server:defer": true, "server:component-directive": "defer", "server:component-path": "C:/Users/leand/Proyectos/market-for-me/src/components/auth/buttons/GoogleSignin.astro", "server:component-export": "default", "class": "astro-3ef6ksr2" }, { "fallback": ($$result2) => renderTemplate`${renderComponent($$result2, "SkeletonBox", $$SkeletonBox, { "slot": "fallback", "width": "180px", "class": "astro-3ef6ksr2" })}` })} </section> </header> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/Header.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Astro description", header = true } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${header && renderTemplate`${renderComponent($$result, "Header", $$Header, {})}`} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/leand/Proyectos/market-for-me/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
