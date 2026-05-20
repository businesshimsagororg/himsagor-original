import { z } from "zod";

export const bangladeshPhoneRegex = /^(?:\+?8801|01)[3-9]\d{8}$/;

export const orderSchema = z.object({
  customerName: z.string().min(2),
  phone: z
    .string()
    .trim()
    .regex(bangladeshPhoneRegex, "Enter a valid Bangladeshi mobile number"),
  district: z.string().min(2),
  thana: z.string().min(2),
  villageRoad: z.string().min(2),
  address: z.string().min(5),
  zone: z.literal("bangladesh").default("bangladesh"),
  paymentMethod: z.enum(["cod", "bkash_gateway", "nagad_gateway"]),
  couponCode: z.string().optional(),
  note: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive()
      })
    )
    .min(1)
});

export type OrderInput = z.infer<typeof orderSchema>;
