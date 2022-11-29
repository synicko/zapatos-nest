-- Verify zapatos-test:01-revenues on pg

BEGIN;

SELECT * FROM shop.revenues WHERE false;

ROLLBACK;
