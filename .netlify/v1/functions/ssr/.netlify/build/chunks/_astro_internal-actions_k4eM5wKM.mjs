import './_astro_actions_hWnmEwMn.mjs';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import { d as db } from './server_DBUda-Za.mjs';
import { b as getUserCartOrCreate, C as CART_COOKIES_KEY, d as getUserCart, c as currentUser } from './cart_aGo_O-Lf.mjs';
import { A as AstroError, p as ActionCalledFromServerError } from './astro/assets-service_DUhi21d6.mjs';
import { c as callSafely, a as ActionError, b as ActionInputError } from './shared_DsA9hi-M.mjs';
import { Currency } from '@prisma/client';
import { v2 } from 'cloudinary';
import { R as Routes } from './routes_DG_8Jzi8.mjs';
import easyinvoice from 'easyinvoice';

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
    if (!inputSchema) return await handler(unparsedInput, context);
    const baseSchema = unwrapSchemaEffects(inputSchema);
    const parsed = await inputSchema.safeParseAsync(
      baseSchema instanceof z$1.ZodObject ? formDataToObject(unparsedInput, baseSchema) : unparsedInput
    );
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
  const obj = schema._def.unknownKeys === "passthrough" ? Object.fromEntries(formData.entries()) : {};
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
function unwrapSchemaEffects(schema) {
  while (schema instanceof z$1.ZodEffects || schema instanceof z$1.ZodPipeline) {
    if (schema instanceof z$1.ZodEffects) {
      schema = schema._def.schema;
    }
    if (schema instanceof z$1.ZodPipeline) {
      schema = schema._def.in;
    }
  }
  return schema;
}

const cart = {
  addProductToCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string()
    }),
    handler: async ({ productId }, context) => {
      try {
        const currCart = await getUserCartOrCreate(context);
        if (currCart) {
          const cookieStore = context.cookies;
          cookieStore.set(CART_COOKIES_KEY, currCart.id, { path: "/" });
          const item = currCart.cartItems.find(
            (cartItem) => cartItem.product.id === productId
          );
          if (item) {
            if (item.quantity + 1 > item.product.stock + item.quantity) return;
            await db.cartItem.update({
              data: {
                quantity: {
                  increment: 1
                },
                product: {
                  update: {
                    stock: {
                      decrement: 1
                    }
                  }
                }
              },
              where: {
                cartId_productId: {
                  cartId: currCart.id,
                  productId
                }
              }
            });
            return;
          }
          const product = await db.product.findUnique({
            where: {
              id: productId
            }
          });
          if (!product) return;
          if (product.stock <= 0) return;
          await db.cartItem.create({
            data: {
              cartId: currCart.id,
              productId,
              quantity: 1
            }
          });
          await db.product.update({
            data: {
              stock: {
                decrement: 1
              }
            },
            where: {
              id: productId
            }
          });
        }
      } catch (error) {
        console.error(
          "Ocurrió un error al agregar un producto al carrito. ",
          error
        );
      }
    }
  }),
  deleteProductFromCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string()
    }),
    handler: async ({ productId }, context) => {
      try {
        const currCart = await getUserCart(context);
        if (currCart) {
          const deletedItem = await db.cartItem.delete({
            where: {
              cartId_productId: {
                cartId: currCart.id,
                productId
              }
            }
          });
          await db.product.update({
            data: {
              stock: {
                increment: deletedItem.quantity
              }
            },
            where: {
              id: productId
            }
          });
        }
      } catch (error) {
        console.error(
          "Ocurrió un error al eliminar un producto de un carrito. ",
          error
        );
      }
    }
  }),
  incrDecrProductFromCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string(),
      action: z.enum(["INCR", "DECR"])
    }),
    handler: async ({ productId, action }, context) => {
      try {
        const currCart = await getUserCart(context);
        if (currCart) {
          const item = currCart.cartItems.find(
            (cartItem) => cartItem.product.id === productId
          );
          if (!item) return;
          if (action === "INCR" && item.quantity + 1 > item.product.stock + item.quantity)
            return;
          else if (action === "DECR" && item.quantity - 1 <= 0) {
            await db.cartItem.delete({
              where: {
                cartId_productId: {
                  cartId: currCart.id,
                  productId
                }
              }
            });
            await db.product.update({
              data: {
                stock: {
                  increment: 1
                }
              },
              where: {
                id: productId
              }
            });
            return;
          }
          await db.cartItem.update({
            data: {
              quantity: {
                increment: action === "INCR" ? 1 : void 0,
                decrement: action === "DECR" ? 1 : void 0
              },
              product: {
                update: {
                  stock: {
                    increment: action === "DECR" ? 1 : void 0,
                    decrement: action === "INCR" ? 1 : void 0
                  }
                }
              }
            },
            where: {
              cartId_productId: {
                cartId: currCart.id,
                productId
              }
            }
          });
        }
      } catch (error) {
        console.error(
          "Ocurrió un error al incrementar/decrementar la cantidad de un producto en un carrito. ",
          error
        );
      }
    }
  })
};

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
  stock: z.number().min(0),
  description: z.string().max(1e3).optional(),
  images: z.array(z.instanceof(File).optional())
});

v2.config({
  cloud_name: "dzqzoj9ry",
  api_key: "796987973368889",
  api_secret: "ucOOqI2CcsnKMMv2L6qtFbPO4Mk",
  secure: true
});
async function upload(file, tag, resource_type = "image", format) {
  let fileUrl = null;
  let publicId = null;
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
            publicId = result?.public_id;
            resolve(result);
          }
        ).end(buffer);
      });
    }
  } catch (error) {
    console.error("Hubo un error al subir el archivo.", error);
    return null;
  }
  return { fileUrl, publicId };
}
async function uploadMarketImage(image) {
  let result = await upload(image, "market_images");
  return result?.fileUrl;
}
async function uploadProductImage(image) {
  let result = await upload(image, "product_images");
  if (result?.fileUrl) {
    result.fileUrl = v2.url(result.fileUrl, {
      fetch_format: "auto",
      quality: "auto"
    });
    result.fileUrl = v2.url(result?.fileUrl, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500
    });
  }
  return result?.fileUrl;
}

const markets = {
  createMarket: defineAction({
    accept: "form",
    input: createMarketSchema,
    handler: async ({ name, description, image, address, phone1, phone2 }, context) => {
      let createdMarket = null;
      let marketImage = null;
      if (image) marketImage = await uploadMarketImage(image);
      const user = await currentUser(context.request);
      if (!user?.id) return context.rewrite(Routes.home);
      try {
        createdMarket = await db.market.create({
          data: {
            name,
            description,
            imageUrl: marketImage,
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
      let marketImage = void 0;
      if (image) {
        const newMarketImage = await uploadMarketImage(image);
        if (newMarketImage) marketImage = newMarketImage;
      }
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
      return mutateMarket ?? 0;
    }
  })
};

const products = {
  createProduct: defineAction({
    accept: "form",
    input: z.object({
      marketId: z.string()
    }),
    handler: async ({ marketId }) => {
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
      stock,
      description,
      images
    }) => {
      let mutateProduct = null;
      let imageUrls = [];
      for (let index = 0; index < images.length; index++) {
        const element = images[index];
        if (element) {
          const newUrl = await uploadProductImage(element);
          if (newUrl) imageUrls.push(newUrl);
        }
      }
      try {
        mutateProduct = await db.product.update({
          where: {
            id: productId
          },
          data: {
            name,
            price,
            currency,
            stock,
            description,
            imageUrls: {
              push: imageUrls
            }
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
    input: z.object({
      productId: z.string()
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

const invoices = {
  generateInvoice: defineAction({
    accept: "form",
    handler: async (_, context) => {
      try {
        const currCart = await getUserCart(context);
        if (currCart) {
          const products = currCart.cartItems.map((item) => ({
            quantity: item.quantity.toString(),
            description: item.product.name,
            taxRate: 0,
            price: item.product.price
          }));
          const data = {
            apiKey: "jjSyftUbHMCKM9oT22Rgzpa0s4GdoHt2XnbfPcZXQvuadBRtcIjQnmZ0Tz0OvrUU",
            mode: "development",
            products
          };
          const invoice = await easyinvoice.createInvoice(data);
          return invoice.pdf;
        }
      } catch (error) {
        console.error("Hubo un error al terminar una compra. ", error);
      }
    }
  })
};

const server = {
  // Mercados
  markets,
  // Productos
  products,
  // Carrito de compras
  cart,
  // Facturas
  invoices
};

export { server };
