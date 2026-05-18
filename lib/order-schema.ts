import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(10),
  district: z.string().min(2),
  zone: z.enum(["dhaka", "outside-dhaka"]),
  paymentMethod: z.enum(["cod", "bkash", "nagad"]),
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
