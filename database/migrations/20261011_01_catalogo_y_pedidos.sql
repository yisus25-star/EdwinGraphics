-- Cambios aditivos para catálogo, compatibilidad, variantes y observaciones.
ALTER TABLE categorias
  ADD COLUMN IF NOT EXISTS parent_id INTEGER NULL
  REFERENCES categorias(id) ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS idx_categorias_parent_id ON categorias(parent_id);

ALTER TABLE productos
  ADD COLUMN IF NOT EXISTS compatibilidad_moto TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS variantes JSONB NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE pedidos
  ADD COLUMN IF NOT EXISTS observaciones TEXT NULL;

CREATE INDEX IF NOT EXISTS idx_detalle_pedido_producto_id ON detalle_pedido(producto_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_payment_status ON pedidos(payment_status);
