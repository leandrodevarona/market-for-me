import { ActionError, defineAction } from "astro:actions";
import { db } from "../lib/db";
import { z } from "astro:schema";
import { Role } from "@prisma/client";
import { isManager } from "@auth-astro/session";

export const users = {
  createManager: defineAction({
    accept: "form",
    input: z.object({
      userId: z.string(),
    }),
    handler: async ({ userId }, context) => {
      try {
        const manager = await isManager(context.request);

        if (manager) return Role.MANAGER;

        await db.user.update({
          data: {
            role: Role.MANAGER,
          },
          where: {
            id: userId,
          },
        });

        return Role.MANAGER;
      } catch (error) {
        throw new ActionError({
          code: "CONFLICT",
          message:
            "No puede crear un mercado en estos momentos. Inténtelo más tarde.",
        });
      }
    },
  }),
};
