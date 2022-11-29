-- Deploy zapatos-test:01-revenues to pg

BEGIN;

CREATE VIEW shop.revenues AS
SELECT 
  shop."order".id, 
  (SELECT first_name || ' ' || last_name FROM shop."user" WHERE id="order".user_id) AS customer, 
  ARRAY_AGG(product.description) AS products,
  SUM(order_item.quantity * product.price) as total
FROM shop."order"
JOIN shop.order_item ON order_item.order_id = "order".id
JOIN shop.product ON product.id = order_item.product_id
GROUP BY "order".id;

COMMIT;
