-- Deploy zapatos-test:01-init to pg

BEGIN;

CREATE USER vendor WITH PASSWORD 'vendor';
CREATE USER account WITH PASSWORD 'account';

-- CREATE EXTENSION postgres_fdw;

-- CREATE SERVER "localhost"
-- FOREIGN DATA WRAPPER postgres_fdw
-- OPTIONS (host '127.0.0.1', port '5432', dbname 'zapatos', updatable 'false');

-- CREATE USER MAPPING FOR "nico"
-- SERVER "localhost"
-- OPTIONS (user 'nico', password_required 'false');

CREATE TYPE COLOR AS ENUM ('yellow', 'red', 'blue', 'green');

CREATE SCHEMA shop;

CREATE TABLE shop."user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  favorite_color COLOR
);

CREATE TABLE shop.product (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  description TEXT UNIQUE NOT NULL,
  price NUMERIC NOT NULL,
  attributes jsonb
);

CREATE TABLE shop."order" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id INT NOT NULL REFERENCES shop."user"(id)
);

CREATE TABLE shop.order_item (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quantity INT NOT NULL,
  order_id INT NOT NULL REFERENCES shop."order"(id),
  product_id INT NOT NULL REFERENCES shop.product(id)
);

CREATE SCHEMA billing;

CREATE TABLE billing.invoice (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id INT NOT NULL UNIQUE REFERENCES shop.order(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ  
);

-- CREATE FOREIGN TABLE billing."user" ()
-- INHERITS (shop."user")
-- SERVER "localhost";

-- CREATE FOREIGN TABLE billing.product ()
-- INHERITS (shop.product)
-- SERVER "localhost";

-- CREATE FOREIGN TABLE billing."order" () 
-- INHERITS (shop."order")
-- SERVER "localhost";

-- CREATE FOREIGN TABLE billing.order_item ()
-- INHERITS (shop.order_item)
-- SERVER "localhost";

COMMIT;
