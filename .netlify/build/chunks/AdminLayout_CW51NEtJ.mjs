import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, e as renderSlot } from './astro/server_BYO_c3aR.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './Layout_BPsQhxxP.mjs';
import { R as Routes } from './routes_DK5zeVL6.mjs';
import { b as getMarketsByUser } from './markets_BsxLjTlS.mjs';
import { c as currentUser } from './cart_DELYUVf7.mjs';
import { $ as $$Icon } from './Icon_BDERPYzh.mjs';
/* empty css                         */

async function isDeployedMarket(marketUrl) {
  let isDeployed = false;
  try {
    const response = await fetch(marketUrl);
    if (response.status >= 200 && response.status <= 299) isDeployed = true;
  } catch (error) {
    console.error(error);
  }
  return isDeployed;
}

const $$Astro$2 = createAstro();
const $$DeployedMarketInfo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DeployedMarketInfo;
  const { class: className, marketId } = Astro2.props;
  const base_url = Astro2.url.origin;
  const marketUrl = base_url + Routes.adminMarkets(marketId);
  const isDeployed = await isDeployedMarket(marketUrl);
  const iconColor = isDeployed ? "green" : "red";
  const iconTitle = isDeployed ? "Este mercado ya ha sido publicado" : "Este mercado no ha sido publicado a\xFAn";
  return renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "class": className, "name": "mdi:checkbox-blank-circle", "size": 10, "color": iconColor, "title": iconTitle })}`;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/markets/info/DeployedMarketInfo.astro", void 0);

const $$Astro$1 = createAstro();
const $$SidebarMarketItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SidebarMarketItem;
  const { marketId, marketName } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="sidebar_market__item astro-otr2bxhr"> <a${addAttribute(Routes.adminMarkets(marketId), "href")} class="astro-otr2bxhr">${marketName}</a> ${renderComponent($$result, "DeployedMarketInfo", $$DeployedMarketInfo, { "class": "sidebar_market__point astro-otr2bxhr", "marketId": marketId })} </li> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/sidebar/markets/SidebarMarketItem.astro", void 0);

const $$Astro = createAstro();
const $$SidebarMarkets = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SidebarMarkets;
  const user = await currentUser(Astro2.request);
  const userId = user?.id;
  if (!userId) return;
  const markets = await getMarketsByUser(userId);
  return renderTemplate`${maybeRenderHead()}<details class="sidebar_markets astro-ahm33lyj" open> <summary class="astro-ahm33lyj">
Mercados
<a${addAttribute(Routes.adminCreateMarket, "href")} aria-label="Add market" title="Add new market" class="astro-ahm33lyj"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:plus", "size": 20, "class": "astro-ahm33lyj" })} </a> </summary> <div class="astro-ahm33lyj"> <ol class="sidebar_markets__list astro-ahm33lyj"> ${markets && markets.length > 0 && markets.map((market) => renderTemplate`${renderComponent($$result, "SidebarMarketItem", $$SidebarMarketItem, { "marketId": market.id, "marketName": market.name, "class": "astro-ahm33lyj" })}`)} </ol> </div> </details> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/sidebar/markets/SidebarMarkets.astro", void 0);

const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="sidebar astro-hmfiwpcy"> <header class="sidebar_header astro-hmfiwpcy"> <a${addAttribute(Routes.adminHome, "href")} class="astro-hmfiwpcy"> <h1 class="astro-hmfiwpcy">Dashboard</h1> </a> </header> <nav class="sidebar_nav astro-hmfiwpcy"> ${renderComponent($$result, "SidebarMarkets", $$SidebarMarkets, { "class": "astro-hmfiwpcy" })} </nav> </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/admin/sidebar/Sidebar.astro", void 0);

const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Market Administration", "description": "Managing your marketplace content", "class": "astro-2kanml4j" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin_layout__content astro-2kanml4j"> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "class": "astro-2kanml4j" })} ${renderSlot($$result2, $$slots["default"])} </div> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
