ALTER TABLE pedidos
  ADD COLUMN IF NOT EXISTS wompi_reference VARCHAR(120) UNIQUE,
  ADD COLUMN IF NOT EXISTS wompi_transaction_id VARCHAR(120),
  ADD COLUMN IF NOT EXISTS payment_method_type VARCHAR(40),
  ADD COLUMN IF NOT EXISTS payment_updated_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_pedidos_payment_status_fecha
  ON pedidos (payment_status, fecha DESC);

CREATE TABLE IF NOT EXISTS pagos (
  id BIGSERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE RESTRICT,
  proveedor VARCHAR(30) NOT NULL,
  referencia VARCHAR(120) NOT NULL UNIQUE,
  transaccion_id VARCHAR(120),
  estado VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  monto_cop NUMERIC(12,2) NOT NULL,
  metodo VARCHAR(50),
  comision_estimada_cop NUMERIC(12,2) NOT NULL DEFAULT 0,
  desembolso_estado VARCHAR(30) NOT NULL DEFAULT 'pendiente',
  payload JSONB,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pagos_estado_fecha ON pagos (estado, creado_en DESC);
CREATE INDEX IF NOT EXISTS idx_pagos_pedido ON pagos (pedido_id, creado_en DESC);
