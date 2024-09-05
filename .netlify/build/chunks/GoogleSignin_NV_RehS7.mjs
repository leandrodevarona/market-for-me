import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, b as createAstro, u as unescapeHTML, F as Fragment, f as defineScriptVars, e as renderSlot, s as spreadAttributes, d as addAttribute } from './astro/server_DgnCfmSJ.mjs';
import 'kleur/colors';
import { g as getSession, a as authConfig } from './server_DBUda-Za.mjs';
import 'clsx';
import { $ as $$Icon } from './Icon_Ch9NK6yf.mjs';
/* empty css                         */
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_B7JGV4pR.mjs';
import { R as Routes } from './routes_DK5zeVL6.mjs';

const $$Astro$6 = createAstro();
const $$Auth = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Auth;
  const { authConfig: authConfig$1 = authConfig } = Astro2.props;
  let session = await getSession(Astro2.request, authConfig$1);
  return renderTemplate`${maybeRenderHead()}<div> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(Astro2.slots.render("default", [session]))}` })} </div>`;
}, "C:/Users/leand/Proyectos/market-for-me/node_modules/auth-astro/src/components/Auth.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$5 = createAstro();
const $$SignIn = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$SignIn;
  const key = Math.random().toString(36).slice(2, 11);
  const { provider, options, authParams, ...attrs } = Astro2.props;
  attrs.class = `signin-${key} ${attrs.class ?? ""}`;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", "<button", "> ", " </button>  <script>(function(){", "\n	document\n		.querySelector(`.signin-${key}`)\n		?.addEventListener('click', () => signIn(provider, options, authParams))\n})();<\/script>"], ["", "<button", "> ", " </button>  <script>(function(){", "\n	document\n		.querySelector(\\`.signin-\\${key}\\`)\n		?.addEventListener('click', () => signIn(provider, options, authParams))\n})();<\/script>"])), maybeRenderHead(), spreadAttributes(attrs), renderSlot($$result, $$slots["default"]), defineScriptVars({ provider, options, authParams, key }));
}, "C:/Users/leand/Proyectos/market-for-me/node_modules/auth-astro/src/components/SignIn.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$4 = createAstro();
const $$SignOut = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$SignOut;
  const key = Math.random().toString(36).slice(2, 11);
  const { params, ...attrs } = Astro2.props;
  attrs.class = `signout-${key} ${attrs.class ?? ""}`;
  return renderTemplate(_a || (_a = __template(["", "<button", "> ", " </button>  <script>(function(){", "\n	document.querySelector(`.signout-${key}`)?.addEventListener('click', () => signOut(params))\n})();<\/script>"], ["", "<button", "> ", " </button>  <script>(function(){", "\n	document.querySelector(\\`.signout-\\${key}\\`)?.addEventListener('click', () => signOut(params))\n})();<\/script>"])), maybeRenderHead(), spreadAttributes(attrs), renderSlot($$result, $$slots["default"]), defineScriptVars({ params, key }));
}, "C:/Users/leand/Proyectos/market-for-me/node_modules/auth-astro/src/components/SignOut.astro", void 0);

const $$Astro$3 = createAstro();
const $$DropdownMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$DropdownMenu;
  const {
    id,
    class: className,
    contentClassName,
    buttonClassName,
    contentStyle,
    buttonStyle,
    open,
    title
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([["dropdown_menu", className], "astro-lwtida44"], "class:list")}${addAttribute(`--dropdown-id: ${id}`, "style")}> <input${addAttribute(`dropdown-${id}`, "id")} class="dropdown_menu__open astro-lwtida44" type="checkbox" hidden${addAttribute(open, "checked")}> <label${addAttribute((buttonClassName ?? "") + " astro-lwtida44", "class")}${addAttribute(buttonStyle, "style")}${addAttribute(`dropdown-${id}`, "for")}${addAttribute(title, "title")}> ${renderSlot($$result, $$slots["button_content"])} </label> <menu${addAttribute([["dropdown_menu__content", contentClassName], "astro-lwtida44"], "class:list")}${addAttribute(contentStyle, "style")}> <header class="dropdown_menu__content-close astro-lwtida44"> <label${addAttribute([["primary_button", "centered_button"], "astro-lwtida44"], "class:list")}${addAttribute(`dropdown-${id}`, "for")} title="Close menu"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:close", "size": 15, "class": "astro-lwtida44" })} </label> </header> ${renderSlot($$result, $$slots["default"])} </menu> </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/common/menus/DropdownMenu.astro", void 0);

const $$Astro$2 = createAstro();
const $$UserAvatar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$UserAvatar;
  const { image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="user_avatar astro-mpca6vin"> ${image ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": image, "alt": "User avatar", "width": 40, "height": 40, "class": "astro-mpca6vin" })}` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:account", "size": 40, "class": "astro-mpca6vin" })}`} </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/auth/UserAvatar.astro", void 0);

const $$Signout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "SignOut", $$SignOut, { "class": "signout_button astro-aa7k2twp" }, { "default": ($$result2) => renderTemplate`Cerrar sesión` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/auth/buttons/Signout.astro", void 0);

const $$Astro$1 = createAstro();
const $$MainMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MainMenu;
  const { userName, userImage } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "DropdownMenu", $$DropdownMenu, { "id": "main_menu", "contentStyle": "top: calc(100% + 1rem); right: 10px;", "class": "astro-tvtu53q6" }, { "button_content": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="main_menu__avatar astro-tvtu53q6"> <p class="astro-tvtu53q6">${userName}</p> ${renderComponent($$result2, "UserAvatar", $$UserAvatar, { "image": userImage, "class": "astro-tvtu53q6" })} </div>`, "default": ($$result2) => renderTemplate`  <div class="main_menu__container astro-tvtu53q6"> <a class="primary_button astro-tvtu53q6"${addAttribute(Routes.adminHome, "href")}>Panel de control</a> ${renderComponent($$result2, "Signout", $$Signout, { "class": "astro-tvtu53q6" })} </div> ` })} `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/MainMenu.astro", void 0);

const $$Astro = createAstro();
const $$GoogleSignin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GoogleSignin;
  const session = await getSession(Astro2.request);
  return renderTemplate`${maybeRenderHead()}<div class="google_signin astro-ewzdmjzt"> ${session ? renderTemplate`${renderComponent($$result, "MainMenu", $$MainMenu, { "userName": session.user?.name, "userImage": session.user?.image, "class": "astro-ewzdmjzt" })}` : renderTemplate`${renderComponent($$result, "SignIn", $$SignIn, { "class:list": [["primary_button", "centered_button", "google_signin"], "astro-ewzdmjzt"], "provider": "google" }, { "default": ($$result2) => renderTemplate`
Crear mi mercado
` })}`} </div> `;
}, "C:/Users/leand/Proyectos/market-for-me/src/components/auth/buttons/GoogleSignin.astro", void 0);

const $$file = "C:/Users/leand/Proyectos/market-for-me/src/components/auth/buttons/GoogleSignin.astro";
const $$url = undefined;

export { $$GoogleSignin as default, $$file as file, $$url as url };
