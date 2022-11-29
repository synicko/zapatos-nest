-- Verify zapatos-test:01-init on pg

BEGIN;

SELECT * FROM shop."user" WHERE false;
SELECT * FROM shop.product WHERE false;
SELECT * FROM shop."order" WHERE false;
SELECT * FROM shop.order_item WHERE false;
SELECT * FROM billing.invoice WHERE false;

ROLLBACK;
