import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DNSgUAzZ.mjs';
import { onRequest } from './_astro-internal_middleware.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map([
	['CartModal', () => import('./chunks/CartModal_BtDrWbEE.mjs')],
	['GoogleSignin', () => import('./chunks/GoogleSignin_CTlu84f-.mjs')],
	['Cart', () => import('./chunks/Cart_BGEZMfzR.mjs')],
]);;

const _page0 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page1 = () => import('./pages/_image.astro.mjs');
const _page2 = () => import('./pages/api/auth/_---auth_.astro.mjs');
const _page3 = () => import('./pages/404.astro.mjs');
const _page4 = () => import('./pages/admin/markets/create.astro.mjs');
const _page5 = () => import('./pages/admin/markets/_marketid_.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/markets/_marketid_.astro.mjs');
const _page8 = () => import('./pages/products/_productid_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/actions/runtime/route.js", _page0],
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page1],
    ["node_modules/auth-astro/src/api/[...auth].ts", _page2],
    ["src/pages/404.astro", _page3],
    ["src/pages/admin/markets/create/index.astro", _page4],
    ["src/pages/admin/markets/[marketId].astro", _page5],
    ["src/pages/admin/index.astro", _page6],
    ["src/pages/markets/[marketId].astro", _page7],
    ["src/pages/products/[productId].astro", _page8],
    ["src/pages/index.astro", _page9]
]);


const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "062b7123-b60d-4ce7-894e-9e90175b361e"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
