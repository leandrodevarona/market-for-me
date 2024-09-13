import { Role } from "@prisma/client";
import { getSession } from "auth-astro/server";

export async function currentUser(request: Request) {
  const session = await getSession(request);
  return session?.user;
}

export async function isLoggedIn(request: Request) {
  const user = await currentUser(request);
  return user !== undefined;
}

export async function isManager(request: Request) {
  const user = await currentUser(request);
  return user?.role === Role.MANAGER;
}
