-- Verify zapatos-test:03-revenuesForCustomer on pg

BEGIN;

SELECT shop.revenues_for_customer(1);

ROLLBACK;
