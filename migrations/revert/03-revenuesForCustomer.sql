-- Revert zapatos-test:03-revenuesForCustomer from pg

BEGIN;

DROP FUNCTION shop.revenues_for_customer(int);

COMMIT;
