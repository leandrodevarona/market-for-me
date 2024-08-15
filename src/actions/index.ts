import { defineAction } from "astro:actions";
import { createMarketSchema, updateMarketSchema } from "../lib/zod/schemas";
import { db } from "../lib/db";
import { currentUser } from "../lib/auth-astro/session";
import { Routes } from "../lib/utils/routes";
import { buildProject } from "../lib/build/build";

export const server = {
  createMarket: defineAction({
    accept: "form",
    input: createMarketSchema,
    handler: async (
      { name, description, image, address, phone1, phone2 },
      context
    ) => {
      console.log(image);

      let mutateMarket = null;

      const user = await currentUser(context.request);

      if (!user?.id) return context.redirect(Routes.home);

      try {
        mutateMarket = await db.market.create({
          data: {
            name,
            description,
            imageUrl: null,
            userId: user.id,
            contact: {
              address,
              phone1,
              phone2,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }

      await buildProject();

      return mutateMarket ?? 0;
    },
  }),
  updateMarket: defineAction({
    accept: "form",
    input: updateMarketSchema,
    handler: async ({
      marketId,
      name,
      description,
      image,
      address,
      phone1,
      phone2,
    }) => {
      let mutateMarket = null;

      try {
        mutateMarket = await db.market.update({
          where: {
            id: marketId,
          },
          data: {
            name,
            description,
            contact: {
              address,
              phone1,
              phone2,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }

      await buildProject();

      return mutateMarket ?? 0;
    },
  }),
};
