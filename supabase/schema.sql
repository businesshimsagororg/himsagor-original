create table if not exists orders (
  id text primary key,
  customer_name text not null,
  phone text not null,
  address text not null,
  district text not null,
  zone text not null check (zone in ('dhaka', 'outside-dhaka')),
  payment_method text not null check (payment_method in ('cod', 'bkash', 'nagad')),
  coupon_code text,
  note text,
  subtotal integer not null,
  discount integer not null default 0,
  shipping integer not null,
  total integer not null,
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id text not null references orders(id) on delete cascade,
  product_id text not null,
  quantity integer not null check (quantity > 0),
  unit_price integer not null
);

create index if not exists orders_phone_idx on orders(phone);
create index if not exists orders_created_at_idx on orders(created_at desc);
