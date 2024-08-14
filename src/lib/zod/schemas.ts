import { z } from "astro/zod";

export const marketSchema = z.object({
  name: z.string({ required_error: "The name is required" }),
  description: z.string().optional(),
  image: z.instanceof(File).optional(),
  address: z.string().optional(),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
});
