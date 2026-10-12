ALTER TABLE producto_imagenes
  ADD COLUMN IF NOT EXISTS color_nombre VARCHAR(60);

UPDATE producto_imagenes
SET color_nombre = 'Color / vista ' || (orden + 1)
WHERE color_nombre IS NULL OR BTRIM(color_nombre) = '';
