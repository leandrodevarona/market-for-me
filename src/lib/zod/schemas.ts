import { Currency } from "@prisma/client";
import { z } from "astro:schema";

export const createMarketSchema = z.object({
  name: z.string({ required_error: "The name is required" }).max(30),
  description: z.string().max(100).optional(),
  image: z.instanceof(File).optional(),
  address: z.string().max(100).optional(),
  phone1: z.string().max(20).optional(),
  phone2: z.string().max(20).optional(),
});

export const updateMarketSchema = z.object({
  name: z.string({ required_error: "The name is required" }).max(30),
  description: z.string().max(100).optional(),
  image: z.instanceof(File).optional(),
  address: z.string().max(100).optional(),
  phone1: z.string().max(20).optional(),
  phone2: z.string().max(20).optional(),
  marketId: z.string(),
});

export const updateProductSchema = z.object({
  productId: z.string(),
  name: z.string({ required_error: "The name is required" }).max(150),
  price: z.number({ required_error: "The price is required" }).min(0),
  currency: z.nativeEnum(Currency).default(Currency.USD),
  description: z.string().max(1000).optional(),
  images: z.array(z.instanceof(File).optional()),
});
