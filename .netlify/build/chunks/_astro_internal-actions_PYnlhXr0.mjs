import './_astro_actions_BNIfTu6q.mjs';
import { Currency } from '@prisma/client';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import { d as db } from './server_DBUda-Za.mjs';
import { c as currentUser } from './session_DKINfTGu.mjs';
import { R as Routes } from './routes_DK5zeVL6.mjs';
import { v2 } from 'cloudinary';
import { A as AstroError, p as ActionCalledFromServerError } from './astro/assets-service_CLMVF3-W.mjs';
import { c as callSafely, a as ActionError, b as ActionInputError } from './shared_jip68GMR.mjs';

function defineAction({
  accept,
  input: inputSchema,
  handler
}) {
  const serverHandler = accept === "form" ? getFormServerHandler(handler, inputSchema) : getJsonServerHandler(handler, inputSchema);
  async function safeServerHandler(unparsedInput) {
    if (typeof this === "function") {
      throw new AstroError(ActionCalledFromServerError);
    }
    return callSafely(() => serverHandler(unparsedInput, this));
  }
  Object.assign(safeServerHandler, {
    orThrow(unparsedInput) {
      if (typeof this === "function") {
        throw new AstroError(ActionCalledFromServerError);
      }
      return serverHandler(unparsedInput, this);
    }
  });
  return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (!(unparsedInput instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData."
      });
    }
    if (!(inputSchema instanceof z$1.ZodObject)) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(formDataToObject(unparsedInput, inputSchema));
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function getJsonServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (unparsedInput instanceof FormData) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts JSON."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(unparsedInput);
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function formDataToObject(formData, schema) {
  const obj = {};
  for (const [key, baseValidator] of Object.entries(schema.shape)) {
    let validator = baseValidator;
    while (validator instanceof z$1.ZodOptional || validator instanceof z$1.ZodNullable || validator instanceof z$1.ZodDefault) {
      if (validator instanceof z$1.ZodDefault && !formData.has(key)) {
        obj[key] = validator._def.defaultValue();
      }
      validator = validator._def.innerType;
    }
    if (!formData.has(key) && key in obj) {
      continue;
    } else if (validator instanceof z$1.ZodBoolean) {
      const val = formData.get(key);
      obj[key] = val === "true" ? true : val === "false" ? false : formData.has(key);
    } else if (validator instanceof z$1.ZodArray) {
      obj[key] = handleFormDataGetAll(key, formData, validator);
    } else {
      obj[key] = handleFormDataGet(key, formData, validator, baseValidator);
    }
  }
  return obj;
}
function handleFormDataGetAll(key, formData, validator) {
  const entries = Array.from(formData.getAll(key));
  const elementValidator = validator._def.type;
  if (elementValidator instanceof z$1.ZodNumber) {
    return entries.map(Number);
  } else if (elementValidator instanceof z$1.ZodBoolean) {
    return entries.map(Boolean);
  }
  return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
  const value = formData.get(key);
  if (!value) {
    return baseValidator instanceof z$1.ZodOptional ? void 0 : null;
  }
  return validator instanceof z$1.ZodNumber ? Number(value) : value;
}

const createMarketSchema = z.object({
  name: z.string({ required_error: "The name is required" }).max(30),
  description: z.string().max(100).optional(),
  image: z.instanceof(File).optional(),
  address: z.string().max(100).optional(),
  phone1: z.string().max(20).optional(),
  phone2: z.string().max(20).optional()
});
const updateMarketSchema = z.object({
  name: z.string({ required_error: "The name is required" }).max(30),
  description: z.string().max(100).optional(),
  image: z.instanceof(File).optional(),
  address: z.string().max(100).optional(),
  phone1: z.string().max(20).optional(),
  phone2: z.string().max(20).optional(),
  marketId: z.string()
});
const updateProductSchema = z.object({
  productId: z.string(),
  name: z.string({ required_error: "The name is required" }).max(150),
  price: z.number({ required_error: "The price is required" }).min(0),
  currency: z.nativeEnum(Currency).default(Currency.USD),
  description: z.string().max(1e3).optional(),
  images: z.array(z.instanceof(File).optional())
});

async function buildProject() {
  try {
    const url = "https://api.netlify.com/build_hooks/66b68dc3a5564d79ed267714";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
  }
}

v2.config({
  cloud_name: "dzqzoj9ry",
  api_key: "796987973368889",
  api_secret: "ucOOqI2CcsnKMMv2L6qtFbPO4Mk",
  secure: true
});
async function upload(file, tag, resource_type = "image", format) {
  let fileUrl = null;
  try {
    if (file && !!file.size) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await new Promise((resolve, reject) => {
        v2.uploader.upload_stream(
          {
            tags: [tag || "default_tag"],
            resource_type,
            format
          },
          function(error, result) {
            if (error) {
              reject(error);
              return;
            }
            fileUrl = result?.secure_url;
            resolve(result);
          }
        ).end(buffer);
      });
    }
  } catch (error) {
    console.error("Hubo un error al subir el archivo.", error);
    return null;
  }
  return fileUrl;
}
async function uploadMarketImage(image) {
  return upload(image, "market_images");
}

const server = {
  // Mercados
  createMarket: defineAction({
    accept: "form",
    input: createMarketSchema,
    handler: async ({ name, description, image, address, phone1, phone2 }, context) => {
      let createdMarket = null;
      console.log(image);
      const user = await currentUser(context.request);
      if (!user?.id) return context.redirect(Routes.home);
      try {
        createdMarket = await db.market.create({
          data: {
            name,
            description,
            imageUrl: null,
            userId: user.id,
            contact: {
              address,
              phone1,
              phone2
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
      await buildProject();
      return createdMarket ?? 0;
    }
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
      phone2
    }) => {
      let mutateMarket = null;
      let marketImage = null;
      if (image) marketImage = await uploadMarketImage(image);
      try {
        mutateMarket = await db.market.update({
          where: {
            id: marketId
          },
          data: {
            name,
            description,
            contact: {
              address,
              phone1,
              phone2
            },
            imageUrl: marketImage
          }
        });
      } catch (error) {
        console.error(error);
      }
      await buildProject();
      return mutateMarket ?? 0;
    }
  }),
  // Productos
  createProduct: defineAction({
    accept: "form",
    input: z$1.object({
      marketId: z$1.string()
    }),
    handler: async ({ marketId }) => {
      console.log(marketId);
      let createdProduct = null;
      try {
        createdProduct = await db.product.create({
          data: {
            marketId
          }
        });
      } catch (error) {
        console.error(error);
      }
      return createdProduct ?? 0;
    }
  }),
  updateProduct: defineAction({
    accept: "form",
    input: updateProductSchema,
    handler: async ({
      productId,
      name,
      price,
      currency,
      description,
      images
    }) => {
      let mutateProduct = null;
      console.log(images);
      try {
        mutateProduct = await db.product.update({
          where: {
            id: productId
          },
          data: {
            name,
            price,
            currency,
            description
          }
        });
      } catch (error) {
        console.error(error);
      }
      return mutateProduct ?? 0;
    }
  }),
  deleteProduct: defineAction({
    accept: "form",
    input: z$1.object({
      productId: z$1.string()
    }),
    handler: async ({ productId }) => {
      let deletedProduct = null;
      try {
        deletedProduct = await db.product.delete({
          where: {
            id: productId
          }
        });
      } catch (error) {
        console.error(error);
      }
      return deletedProduct ?? 0;
    }
  })
};

export { server };
