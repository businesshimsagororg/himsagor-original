create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text unique not null,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists customer_addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  district text not null,
  thana text not null,
  village_road text not null,
  address text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id text primary key,
  customer_id uuid references customers(id),
  customer_name text not null,
  phone text not null,
  address text not null,
  district text not null,
  thana text not null default '',
  village_road text not null default '',
  zone text not null default 'bangladesh',
  payment_method text not null check (payment_method in ('cod', 'bkash_gateway', 'nagad_gateway')),
  payment_status text not null default 'cod_pending',
  coupon_code text,
  note text,
  subtotal integer not null,
  discount integer not null default 0,
  shipping integer not null,
  total integer not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered')),
  courier_partner text,
  tracking_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id text not null references orders(id) on delete cascade,
  product_id text not null,
  quantity integer not null check (quantity > 0),
  unit_price integer not null
);

create table if not exists wishlists (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  product_id text not null,
  created_at timestamptz not null default now(),
  unique(customer_id, product_id)
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  product_id text,
  rating integer not null check (rating between 1 and 5),
  review_text text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table orders add column if not exists customer_id uuid references customers(id);
alter table orders add column if not exists thana text not null default '';
alter table orders add column if not exists village_road text not null default '';
alter table orders add column if not exists payment_status text not null default 'cod_pending';
alter table orders add column if not exists courier_partner text;
alter table orders add column if not exists tracking_number text;
alter table orders add column if not exists updated_at timestamptz not null default now();

create index if not exists orders_phone_idx on orders(phone);
create index if not exists orders_status_idx on orders(status);
create index if not exists orders_tracking_idx on orders(tracking_number);
create index if not exists orders_created_at_idx on orders(created_at desc);
