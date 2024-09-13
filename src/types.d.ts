import type { Role } from "@prisma/client";
import { DefaultUser } from "next-auth";

declare module "@auth/core/types" {
  interface User extends DefaultUser {
    role?: Role | null;
  }
}
