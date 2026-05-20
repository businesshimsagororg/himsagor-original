create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text unique not null check (phone ~ '^(\+?8801|01)[3-9][0-9]{8}$'),
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

create table if not exists product_inventory (
  product_id text primary key,
  stock integer not null check (stock >= 0),
  low_stock_threshold integer not null default 5,
  updated_at timestamptz not null default now()
);

insert into product_inventory (product_id, stock, low_stock_threshold)
values
  ('box-5kg', 42, 8),
  ('box-10kg', 31, 8),
  ('gift-premium', 18, 5),
  ('jumbo-15kg', 12, 4)
on conflict (product_id) do nothing;

create table if not exists coupons (
  code text primary key,
  label text not null,
  discount_type text not null check (discount_type in ('flat', 'percent')),
  discount_value integer not null check (discount_value > 0),
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id text primary key,
  customer_id uuid references customers(id),
  customer_name text not null,
  phone text not null check (phone ~ '^(\+?8801|01)[3-9][0-9]{8}$'),
  address text not null,
  district text not null,
  thana text not null,
  village_road text not null,
  zone text not null default 'bangladesh',
  payment_method text not null check (payment_method in ('cod', 'bkash_gateway', 'nagad_gateway')),
  payment_status text not null default 'cod_pending',
  coupon_code text references coupons(code),
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
  product_id text not null references product_inventory(product_id),
  quantity integer not null check (quantity > 0),
  unit_price integer not null
);

create table if not exists wishlists (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  product_id text not null references product_inventory(product_id),
  created_at timestamptz not null default now(),
  unique(customer_id, product_id)
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  product_id text references product_inventory(product_id),
  rating integer not null check (rating between 1 and 5),
  review_text text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create or replace function decrement_inventory(cart_items jsonb)
returns jsonb
language plpgsql
as $$
declare
  item jsonb;
  requested_product_id text;
  requested_quantity integer;
  available_stock integer;
begin
  for item in select * from jsonb_array_elements(cart_items)
  loop
    requested_product_id := item ->> 'productId';
    requested_quantity := (item ->> 'quantity')::integer;

    select stock into available_stock
    from product_inventory
    where product_id = requested_product_id
    for update;

    if available_stock is null then
      return jsonb_build_object('ok', false, 'product_id', requested_product_id, 'error', 'unknown_product');
    end if;

    if available_stock < requested_quantity then
      return jsonb_build_object('ok', false, 'product_id', requested_product_id, 'error', 'out_of_stock');
    end if;
  end loop;

  for item in select * from jsonb_array_elements(cart_items)
  loop
    requested_product_id := item ->> 'productId';
    requested_quantity := (item ->> 'quantity')::integer;

    update product_inventory
    set stock = stock - requested_quantity,
        updated_at = now()
    where product_id = requested_product_id;
  end loop;

  return jsonb_build_object('ok', true);
end;
$$;

create index if not exists orders_phone_idx on orders(phone);
create index if not exists orders_status_idx on orders(status);
create index if not exists orders_tracking_idx on orders(tracking_number);
create index if not exists orders_created_at_idx on orders(created_at desc);
create index if not exists reviews_product_idx on reviews(product_id);
