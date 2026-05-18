# Himsagor Original

Premium, production-shaped e-commerce website for selling authentic Satkhira Himsagor mangoes online in Bangladesh.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Supabase-ready order storage
- COD, bKash, Nagad checkout flow
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
- optional SMS/email provider keys

## Database

Run `supabase/schema.sql` in your Supabase SQL editor. Without Supabase env vars, checkout still returns a confirmation response for local testing, but live order storage is disabled.

## Admin

Visit `/admin`, enter `ADMIN_TOKEN`, and load orders. Extend status updates, courier exports, and inventory editing from this base.

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
- Dhaka/outside Dhaka shipping fee logic
- Coupon support: `HIMSA100`, `FAMILY5`
- Mandatory unboxing video notice for complaints
- Premium gift and family package catalog
