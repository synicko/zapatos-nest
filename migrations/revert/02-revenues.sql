-- Revert zapatos-test:01-revenues from pg

BEGIN;

DROP VIEW shop.revenues;

COMMIT;
