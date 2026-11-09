-- Retira metadatos exclusivos de la integración Shopify.
-- Ejecutar después de realizar un respaldo de la base de datos.
DROP TABLE IF EXISTS shopify_webhook_events;

ALTER TABLE pedidos
  DROP COLUMN IF EXISTS shopify_checkout_id,
  DROP COLUMN IF EXISTS shopify_checkout_url,
  DROP COLUMN IF EXISTS shopify_order_id,
  DROP COLUMN IF EXISTS shopify_order_number;
