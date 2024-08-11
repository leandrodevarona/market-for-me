import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

const prisma = new PrismaClient();

export const db = prisma;
export const adapter = new PrismaAdapter(db.session, db.user);
