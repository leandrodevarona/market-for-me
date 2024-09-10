import './_astro_actions_eApNQ-9a.mjs';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import { d as db } from './server_DBUda-Za.mjs';
import { b as getUserCartOrCreate, C as CART_COOKIES_KEY, d as getUserCart, c as currentUser } from './cart_CeCDbuUy.mjs';
import { A as AstroError, p as ActionCalledFromServerError } from './astro/assets-service_DUhi21d6.mjs';
import { c as callSafely, a as ActionError, b as ActionInputError } from './shared_DsA9hi-M.mjs';
import { Currency } from '@prisma/client';
import { v2 } from 'cloudinary';
import { R as Routes } from './routes_DG_8Jzi8.mjs';
import { g as getMarketById, b as getMarketByProductId } from './markets_e5lH11HN.mjs';
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

const defaultExchangeRate = {
  USD: { value: 320, editedByUser: false },
  EUR: { value: 330, editedByUser: false },
  MLC: { value: 275, editedByUser: false },
  CUP: { value: 1, editedByUser: false }
};

async function getExchangeRate() {
  try {
    const response = await fetch("https://mdiv.pro/api/get/vars");
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      avg: {
        usd: defaultExchangeRate.USD.value,
        eur: defaultExchangeRate.EUR.value,
        mlc: defaultExchangeRate.MLC.value
      }
    };
  }
}
async function getExchangeRateByMarket(marketId) {
  try {
    const data = await getExchangeRate();
    const exchangeRates = {
      USD: data.avg.usd,
      EUR: data.avg.eur,
      MLC: data.avg.mlc,
      CUP: 1
    };
    const market = await getMarketById(marketId);
    if (!market) return null;
    const marketExchangeRate = market.exchangeRates;
    if (!marketExchangeRate) {
      const updatedMarket2 = await db.market.update({
        data: {
          exchangeRates: {
            USD: { value: exchangeRates.USD },
            EUR: { value: exchangeRates.EUR },
            MLC: { value: exchangeRates.MLC },
            CUP: { value: exchangeRates.CUP }
          }
        },
        where: {
          id: marketId
        }
      });
      return updatedMarket2.exchangeRates;
    }
    let updateData = {
      USD: void 0,
      EUR: void 0,
      MLC: void 0,
      CUP: void 0
    };
    Object.values(Currency).map((currency) => {
      updateData[currency] = !marketExchangeRate[currency].editedByUser ? { value: exchangeRates[currency] } : void 0;
    });
    const updatedMarket = await db.market.update({
      data: {
        exchangeRates: {
          update: updateData
        }
      },
      where: {
        id: marketId
      }
    });
    return updatedMarket.exchangeRates;
  } catch (error) {
    return defaultExchangeRate;
  }
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
      const exchangeRates = await getExchangeRate();
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
            },
            exchangeRates: {
              USD: { value: exchangeRates.avg.usd },
              EUR: { value: exchangeRates.avg.eur },
              MLC: { value: exchangeRates.avg.mlc },
              CUP: { value: 1 }
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

function convertCurrency(exchangeRates, amount, fromCurrency, toCurrency) {
  if (!exchangeRates) return 0;
  if (fromCurrency === toCurrency) return amount;
  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    throw new Error("Moneda no soportada");
  }
  const amountInCUP = amount * exchangeRates[fromCurrency].value;
  const convertedAmount = amountInCUP / exchangeRates[toCurrency].value;
  return convertedAmount;
}

const invoices = {
  generateInvoice: defineAction({
    accept: "form",
    input: z.object({
      currency: z.nativeEnum(Currency).default(Currency.USD)
    }),
    handler: async ({ currency }, context) => {
      try {
        const currCart = await getUserCart(context);
        if (currCart) {
          const productId = currCart.cartItems[0].productId;
          const market = await getMarketByProductId(productId);
          if (!market) return;
          const sender = {
            address: market.contact?.address,
            company: market.name
          };
          const exchangeRates = await getExchangeRateByMarket(market.id);
          if (!exchangeRates) return;
          const products = currCart.cartItems.map((item) => {
            const price = convertCurrency(
              exchangeRates,
              item.product.price,
              item.product.currency,
              currency
            );
            return {
              quantity: item.quantity.toString(),
              description: item.product.name,
              taxRate: 0,
              price
            };
          });
          if (!products || products.length <= 0) return;
          const data = {
            apiKey: "jjSyftUbHMCKM9oT22Rgzpa0s4GdoHt2XnbfPcZXQvuadBRtcIjQnmZ0Tz0OvrUU",
            mode: "development",
            sender,
            products,
            settings: {
              currency
            }
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
