import { Auth } from '@auth/core';
import { parseString } from 'set-cookie-parser';
import Google from '@auth/core/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const defineConfig = (config) => {
  config.prefix ??= "/api/auth";
  config.basePath = config.prefix;
  return config;
};

const prisma = new PrismaClient();
const db = prisma;

const adapter = PrismaAdapter(db);

const authConfig = defineConfig({
  providers: [
    Google({
      clientId: "805426152847-rfqummansv1mivm53rjqqo53k1dtfifp.apps.googleusercontent.com",
      clientSecret: "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"
    })
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    }
  },
  adapter
});

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AstroAuthHandler(prefix, options = authConfig) {
  return async ({ cookies, request }) => {
    const url = new URL(request.url);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) return;
    const res = await Auth(request, options);
    if (["callback", "signin", "signout"].includes(action)) {
      const getSetCookie = res.headers.getSetCookie();
      if (getSetCookie.length > 0) {
        getSetCookie.forEach((cookie) => {
          const { name, value, ...options2 } = parseString(cookie);
          cookies.set(name, value, options2);
        });
        res.headers.delete("Set-Cookie");
      }
    }
    return res;
  };
}
function AstroAuth(options = authConfig) {
  const { AUTH_SECRET, AUTH_TRUST_HOST, VERCEL, NODE_ENV } = Object.assign(__vite_import_meta_env__, { AUTH_TRUST_HOST: "true", AUTH_SECRET: "64b4f2ef44d7f3282a4e538b9f27bfdf266b6b82128c4b311e879a4316e3c49f", NODE: process.env.NODE, NODE_ENV: process.env.NODE_ENV, OS: process.env.OS });
  options.secret ??= AUTH_SECRET;
  options.trustHost ??= !!(AUTH_TRUST_HOST ?? VERCEL ?? NODE_ENV !== "production");
  const { prefix = "/api/auth", ...authOptions } = options;
  const handler = AstroAuthHandler(prefix, authOptions);
  return {
    async GET(context) {
      return await handler(context);
    },
    async POST(context) {
      return await handler(context);
    }
  };
}
async function getSession(req, options = authConfig) {
  options.secret ??= "64b4f2ef44d7f3282a4e538b9f27bfdf266b6b82128c4b311e879a4316e3c49f";
  options.trustHost ??= true;
  const url = new URL(`${options.prefix}/session`, req.url);
  const response = await Auth(new Request(url, { headers: req.headers }), options);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;
  throw new Error(data.message);
}

export { AstroAuth as A, authConfig as a, db as d, getSession as g };
