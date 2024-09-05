import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import './chunks/shared_CGRRXZng.mjs';
import { h as decodeKey } from './chunks/astro/server_BYO_c3aR.mjs';
import 'clsx';
import 'html-escaper';
import { compile } from 'path-to-regexp';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/leand/Proyectos/market-for-me/","adapterName":"@astrojs/netlify","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/auth/[...auth]","pattern":"^\\/api\\/auth(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"...auth","dynamic":true,"spread":true}]],"params":["...auth"],"component":"node_modules/auth-astro/src/api/[...auth].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C7xXQaiB.js"}],"styles":[{"type":"inline","content":".page_404.astro-zetdm5md{min-height:100vh;display:flex;align-items:center;justify-content:center}\n"},{"type":"external","src":"/_astro/index.a5AjunNb.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C7xXQaiB.js"}],"styles":[{"type":"inline","content":".create_market__form.astro-vkwwdw4c{display:flex;flex-direction:column;gap:2rem}.create_market__form.astro-vkwwdw4c p.astro-vkwwdw4c{margin-top:2rem;text-wrap:pretty}.create_market.astro-n4xbbg6r{display:grid;grid-template-columns:.4fr 1fr;gap:2rem;padding:2rem}\n.sidebar_market__item.astro-otr2bxhr{list-style:none;display:flex;align-items:center;margin-bottom:.5rem}.sidebar_market__point.astro-otr2bxhr{margin-left:auto}.sidebar_markets.astro-ahm33lyj summary.astro-ahm33lyj{user-select:none;cursor:pointer;position:relative}.sidebar_markets.astro-ahm33lyj summary.astro-ahm33lyj a.astro-ahm33lyj{position:absolute;right:0;top:50%;transform:translateY(-50%);display:flex;align-items:center}.sidebar_markets__list.astro-ahm33lyj{margin-top:1rem;padding-left:1rem}.sidebar.astro-hmfiwpcy{display:flex;flex-direction:column;gap:1rem;background-color:rgb(var(--callout-rgb))}.sidebar_header.astro-hmfiwpcy{width:100%;background-color:rgb(var(--tile-start-rgb));padding:1rem}.sidebar_header.astro-hmfiwpcy h1.astro-hmfiwpcy{font-size:larger}.sidebar_nav.astro-hmfiwpcy{padding:1rem}.admin_layout__content.astro-2kanml4j{display:grid;grid-template-columns:.2fr 1fr}\n"},{"type":"external","src":"/_astro/index.a5AjunNb.css"},{"type":"inline","content":".generic_form__market.astro-aaysv7cj{display:grid;grid-template-rows:1fr .8fr;gap:2rem}.generic_form__market.astro-aaysv7cj>section.astro-aaysv7cj{display:grid;grid-template-rows:.3fr 1fr 1fr 1fr;gap:1rem}.generic_form__market.astro-aaysv7cj label.astro-aaysv7cj{display:flex;flex-direction:column}.generic_form__market.astro-aaysv7cj textarea.astro-aaysv7cj{resize:none}.generic_form__market.astro-aaysv7cj button.astro-aaysv7cj{padding:.5rem;margin:0 auto;font-size:medium}.market_form__warning.astro-6v3ixbzp{margin-top:2rem}.publish_market.astro-63qkfpns{padding:.5rem;gap:.5rem;font-size:large;font-style:normal}\n"}],"routeData":{"route":"/admin/markets/create","isIndex":true,"type":"page","pattern":"^\\/admin\\/markets\\/create\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"markets","dynamic":false,"spread":false}],[{"content":"create","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/markets/create/index.astro","pathname":"/admin/markets/create","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C7xXQaiB.js"}],"styles":[{"type":"inline","content":".update_market__form.astro-ql45oi6p{display:flex;flex-direction:column;gap:1rem}.market_link.astro-u5fig3hd{max-width:150px;display:flex;align-items:center;gap:.5rem;padding:.5rem}.delete_product__form.astro-qhbpsv6r button.astro-qhbpsv6r{padding:.5rem}.update_product.astro-ls27w35s{list-style:none;width:100%;display:grid;grid-template-rows:.2fr 1fr;line-height:1.4;padding:calc(1.5rem - 1px);border-radius:8px;background-color:rgb(var(--card-rgb));opacity:.8;margin-bottom:2rem}.update_product__header.astro-ls27w35s{display:flex;align-items:center;justify-content:flex-end;gap:1rem}.update_product__form.astro-ls27w35s{display:grid;grid-template-columns:1fr 1fr;gap:2rem}.update_product__form.astro-ls27w35s>section.astro-ls27w35s{display:flex;flex-direction:column;gap:.5rem}.update_product__form.astro-ls27w35s label.astro-ls27w35s{display:flex;flex-direction:column}.update_product__form.astro-ls27w35s textarea.astro-ls27w35s{resize:none}.update_product__form.astro-ls27w35s button.astro-ls27w35s{padding:.5rem;font-size:medium}.market_product__list.astro-rvaksmwl{padding:2rem;padding-left:0}.create_product__form.astro-wnxddvy5 button.astro-wnxddvy5{padding:.5rem}.update_market.astro-ial3ywiu{padding:2rem}.update_market__buttons.astro-ial3ywiu{display:flex;align-items:center;justify-content:flex-end;gap:1rem}.update_market__content.astro-ial3ywiu{display:grid;grid-template-columns:.4fr 1fr;gap:4rem}.update_market__products.astro-ial3ywiu{max-height:60vh;margin-top:3rem;overflow-y:auto;-ms-overflow-style:thin;scrollbar-width:thin}\n.generic_form__market.astro-aaysv7cj{display:grid;grid-template-rows:1fr .8fr;gap:2rem}.generic_form__market.astro-aaysv7cj>section.astro-aaysv7cj{display:grid;grid-template-rows:.3fr 1fr 1fr 1fr;gap:1rem}.generic_form__market.astro-aaysv7cj label.astro-aaysv7cj{display:flex;flex-direction:column}.generic_form__market.astro-aaysv7cj textarea.astro-aaysv7cj{resize:none}.generic_form__market.astro-aaysv7cj button.astro-aaysv7cj{padding:.5rem;margin:0 auto;font-size:medium}.market_form__warning.astro-6v3ixbzp{margin-top:2rem}.publish_market.astro-63qkfpns{padding:.5rem;gap:.5rem;font-size:large;font-style:normal}\n.sidebar_market__item.astro-otr2bxhr{list-style:none;display:flex;align-items:center;margin-bottom:.5rem}.sidebar_market__point.astro-otr2bxhr{margin-left:auto}.sidebar_markets.astro-ahm33lyj summary.astro-ahm33lyj{user-select:none;cursor:pointer;position:relative}.sidebar_markets.astro-ahm33lyj summary.astro-ahm33lyj a.astro-ahm33lyj{position:absolute;right:0;top:50%;transform:translateY(-50%);display:flex;align-items:center}.sidebar_markets__list.astro-ahm33lyj{margin-top:1rem;padding-left:1rem}.sidebar.astro-hmfiwpcy{display:flex;flex-direction:column;gap:1rem;background-color:rgb(var(--callout-rgb))}.sidebar_header.astro-hmfiwpcy{width:100%;background-color:rgb(var(--tile-start-rgb));padding:1rem}.sidebar_header.astro-hmfiwpcy h1.astro-hmfiwpcy{font-size:larger}.sidebar_nav.astro-hmfiwpcy{padding:1rem}.admin_layout__content.astro-2kanml4j{display:grid;grid-template-columns:.2fr 1fr}\n"},{"type":"external","src":"/_astro/index.a5AjunNb.css"}],"routeData":{"route":"/admin/markets/[marketid]","isIndex":false,"type":"page","pattern":"^\\/admin\\/markets\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"markets","dynamic":false,"spread":false}],[{"content":"marketId","dynamic":true,"spread":false}]],"params":["marketId"],"component":"src/pages/admin/markets/[marketId].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C7xXQaiB.js"}],"styles":[{"type":"inline","content":".sidebar_market__item.astro-otr2bxhr{list-style:none;display:flex;align-items:center;margin-bottom:.5rem}.sidebar_market__point.astro-otr2bxhr{margin-left:auto}.sidebar_markets.astro-ahm33lyj summary.astro-ahm33lyj{user-select:none;cursor:pointer;position:relative}.sidebar_markets.astro-ahm33lyj summary.astro-ahm33lyj a.astro-ahm33lyj{position:absolute;right:0;top:50%;transform:translateY(-50%);display:flex;align-items:center}.sidebar_markets__list.astro-ahm33lyj{margin-top:1rem;padding-left:1rem}.sidebar.astro-hmfiwpcy{display:flex;flex-direction:column;gap:1rem;background-color:rgb(var(--callout-rgb))}.sidebar_header.astro-hmfiwpcy{width:100%;background-color:rgb(var(--tile-start-rgb));padding:1rem}.sidebar_header.astro-hmfiwpcy h1.astro-hmfiwpcy{font-size:larger}.sidebar_nav.astro-hmfiwpcy{padding:1rem}.admin_layout__content.astro-2kanml4j{display:grid;grid-template-columns:.2fr 1fr}\n"},{"type":"external","src":"/_astro/index.a5AjunNb.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/leand/Proyectos/market-for-me/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/leand/Proyectos/market-for-me/src/pages/admin/markets/[marketId].astro",{"propagation":"none","containsHead":true}],["C:/Users/leand/Proyectos/market-for-me/src/pages/admin/markets/create/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/leand/Proyectos/market-for-me/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/leand/Proyectos/market-for-me/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/leand/Proyectos/market-for-me/src/pages/markets/[marketId].astro",{"propagation":"none","containsHead":true}],["C:/Users/leand/Proyectos/market-for-me/src/pages/products/[productId].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/auth-astro/src/api/[...auth]@_@ts":"pages/api/auth/_---auth_.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/admin/markets/create/index@_@astro":"pages/admin/markets/create.astro.mjs","\u0000@astro-page:src/pages/admin/markets/[marketId]@_@astro":"pages/admin/markets/_marketid_.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/markets/[marketId]@_@astro":"pages/markets/_marketid_.astro.mjs","\u0000@astro-page:src/pages/products/[productId]@_@astro":"pages/products/_productid_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Cei_DHaA.mjs","C:/Users/leand/Proyectos/market-for-me/src/components/auth/buttons/GoogleSignin.astro":"chunks/GoogleSignin_DtTi8_hw.mjs","C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/Cart.astro":"chunks/Cart_C2vldMsz.mjs","\u0000astro:internal-actions":"chunks/_astro_internal-actions_CTL-BVmg.mjs","C:/Users/leand/Proyectos/market-for-me/node_modules/astro/dist/actions/runtime/virtual/get-action.js":"chunks/get-action_BiBDIlWO.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.C7xXQaiB.js","/astro/hoisted.js?q=0":"_astro/hoisted.CGFpfXPl.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/montserrat-cyrillic-ext-wght-normal.rV1oiNxr.woff2","/_astro/montserrat-cyrillic-wght-normal.CHYi_LmU.woff2","/_astro/montserrat-latin-wght-normal.BDA6280a.woff2","/_astro/montserrat-vietnamese-wght-normal.BXWSX9tz.woff2","/_astro/montserrat-latin-ext-wght-normal.BIVePy9u.woff2","/_astro/index.a5AjunNb.css","/favicon.svg","/_astro/hoisted.C7xXQaiB.js","/_astro/hoisted.CGFpfXPl.js","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[["C:/Users/leand/Proyectos/market-for-me/src/components/auth/buttons/GoogleSignin.astro","GoogleSignin"],["C:/Users/leand/Proyectos/market-for-me/src/components/markets/cart/Cart.astro","Cart"]],"key":"wTnUX6nEtL+HonROEQKR2C/ifIThJG2pOj2KdqTprSs=","experimentalEnvGetSecretEnabled":false});

export { manifest };
