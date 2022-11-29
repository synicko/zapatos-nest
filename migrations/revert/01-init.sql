-- Revert zapatos-test:01-init from pg

BEGIN;

-- DROP FOREIGN TABLE billing.order_item, billing."order", billing.product, billing."user";

DROP TABLE billing.invoice;

DROP SCHEMA billing;

DROP TABLE shop.order_item, shop."order", shop.product, shop."user";

DROP SCHEMA shop;

DROP TYPE COLOR;

-- DROP USER MAPPING FOR "nico" server "localhost";

-- DROP SERVER "localhost";

-- DROP EXTENSION postgres_fdw;

DROP USER account;
DROP USER vendor;

COMMIT;
