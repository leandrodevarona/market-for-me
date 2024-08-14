import { z } from "astro/zod";

export const createMarketSchema = z.object({
  name: z.string({ required_error: "The name is required" }).max(30),
  description: z.string().max(100).optional(),
  image: z.instanceof(File),
  address: z.string().max(100).optional(),
  phone1: z.string().max(20).optional(),
  phone2: z.string().max(20).optional(),
});

export const updateMarketSchema = z.object({
  name: z.string({ required_error: "The name is required" }).max(30),
  description: z.string().max(100).optional(),
  image: z.instanceof(File),
  address: z.string().max(100).optional(),
  phone1: z.string().max(20).optional(),
  phone2: z.string().max(20).optional(),
  marketId: z.string(),
});
