import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../db";

export const adapter = PrismaAdapter(db);
