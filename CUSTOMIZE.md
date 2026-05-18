# How to Customize Himsagor Original

Open this project folder in VS Code:

```powershell
code "C:\Users\Zillur\Documents\Codex\2026-05-17\you-are-a-world-class-senior"
```

If `code` does not work, open VS Code manually, then choose **File > Open Folder** and select this folder:

```text
C:\Users\Zillur\Documents\Codex\2026-05-17\you-are-a-world-class-senior
```

## Most Important Files

### Brand name, phone, WhatsApp, Facebook

Edit:

```text
lib/constants.ts
```

Change these values:

```ts
name: "Himsagor Original",
banglaName: "হিমসাগর অরিজিনাল",
phone: "01577428064",
tagline: "সাতক্ষীরার বাগান থেকে সরাসরি আপনার ঘরে",
```

### Product packages, price, stock, images

Edit:

```text
lib/products.ts
```

Each product has:

```ts
name: "5 KG Box",
banglaName: "৫ কেজি অরিজিনাল বক্স",
weightKg: 5,
price: 749,
compareAt: 890,
stock: 42,
description: "...",
image: "...",
```

Change `price`, `stock`, `description`, and `image` here.

### FAQ questions and answers

Edit:

```text
lib/faqs.ts
```

### Customer reviews

Edit:

```text
lib/reviews.ts
```

### Homepage sections and big text

Edit:

```text
app/page.tsx
```

This controls the homepage hero, orchard story, trust sections, stock meter, reviews, FAQ preview, and final order CTA.

### Shop page

Edit:

```text
app/shop/page.tsx
```

### About page

Edit:

```text
app/about/page.tsx
```

### Contact page

Edit:

```text
app/contact/page.tsx
```

### Checkout form

Edit:

```text
components/checkout-form.tsx
```

### Cart drawer

Edit:

```text
components/cart-drawer.tsx
```

### Colors and design theme

Edit:

```text
tailwind.config.ts
app/globals.css
```

Main colors are named:

```ts
mango
leaf
cream
ink
```

## How to See Your Changes

Keep the dev server running:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

Then open:

```text
http://localhost:3000
```

Most changes update automatically. If not, refresh the browser.

## Important Encoding Rule

When editing Bengali text, save files as **UTF-8**.

In VS Code:

1. Look at the bottom-right corner.
2. Click the encoding label if needed.
3. Choose **Save with Encoding**.
4. Select **UTF-8**.

Do not use old Windows ANSI encoding, because it can make Bangla text unreadable.
