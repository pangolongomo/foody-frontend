import { z } from "zod";

export const orderSchema = z.object({
  currentPage: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  address: z.string(),
  city: z.string(),
  district: z.string(),
  moreInfo: z.string(),
  order: z.string(),
  orderType: z.enum(["delivery", "pickup"]),
});
