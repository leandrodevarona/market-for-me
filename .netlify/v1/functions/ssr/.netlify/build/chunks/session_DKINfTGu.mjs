import { g as getSession } from './server_DBUda-Za.mjs';

async function currentUser(request) {
  const session = await getSession(request);
  return session?.user;
}

export { currentUser as c };
