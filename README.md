# Himsagor Original

Premium, production-shaped e-commerce website for selling authentic Satkhira Himsagor mangoes online in Bangladesh.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Supabase-ready order storage
- COD, bKash, Nagad checkout flow
- bKash/Nagad gateway-ready payment hooks
- Admin order status and courier booking actions
- SEO metadata, sitemap, robots, product schema, FAQ schema

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_FACEBOOK_PAGE`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`
- `NEXT_PUBLIC_MESSENGER_PAGE_ID`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_TOKEN`
- `ADMIN_SMS_NUMBER`
- `BKASH_CHECKOUT_URL`
- `NAGAD_CHECKOUT_URL`
- `PATHAO_COURIER_API_URL`
- `PATHAO_COURIER_API_KEY`
- `STEADFAST_COURIER_API_URL`
- `STEADFAST_COURIER_API_KEY`
- `REDX_COURIER_API_URL`
- `REDX_COURIER_API_KEY`
- `NEXT_PUBLIC_ORCHARD_VIDEO_URL`
- optional SMS/email provider keys

## Database

Run `supabase/schema.sql` in your Supabase SQL editor. Without Supabase env vars, checkout still returns a confirmation response for local testing, but live order storage is disabled.

## Admin

Visit `/admin`, enter `ADMIN_TOKEN`, and load orders. Extend status updates, courier exports, and inventory editing from this base.

The dashboard supports one-click status movement:

```text
Pending -> Confirmed -> Shipped -> Delivered
```

Courier buttons are ready for Pathao, Steadfast, and RedX credentials. Without API keys, demo tracking numbers are generated.

## Deployment

1. Push to GitHub.
2. Import into Vercel.
3. Add environment variables.
4. Configure the production domain.
5. Run the Supabase schema.
6. Place test COD orders and verify order tracking, WhatsApp, analytics, and Facebook Pixel.

## Business Rules Included

- Cash on Delivery
- No advance payment
- Pan Bangladesh delivery
- Flat Bangladesh delivery fee logic
- Coupon support: `HIMSA100`, `FAMILY5`
- Mandatory unboxing video notice for complaints
- Premium gift and family package catalog
- Customer profile, order history, saved address schema, wishlist schema
- Review schema, product schema, breadcrumb schema, sitemap, Open Graph, Facebook Pixel, and Google Analytics hooks
