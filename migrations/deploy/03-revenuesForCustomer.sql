-- Deploy zapatos-test:03-revenuesForCustomer to pg

BEGIN;

CREATE FUNCTION shop.revenues_for_customer(int) RETURNS NUMERIC AS $$
  SELECT COALESCE(
    (
      SELECT SUM(total)
      FROM shop.revenues
      WHERE customer=(
        SELECT first_name || ' ' || last_name FROM shop."user" WHERE id = $1
      )
    ), 
    0
  );
$$ LANGUAGE SQL STRICT;

COMMIT;
