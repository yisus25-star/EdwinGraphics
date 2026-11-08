# Pruebas locales del rediseño EdwinGraphics

## 1. Preparar el entorno

1. Asegúrate de tener Node.js 24 y PostgreSQL instalados.
2. En la raíz del repositorio, copia `.env.example` como `.env`.
3. Completa `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` y un `JWT_SECRET` aleatorio.
4. Para probar el flujo de pedidos sin cobrar, conserva `SHOPIFY_MOCK=true`. En este modo se crea el pedido y se muestra una confirmación de simulación; no se abre una pasarela falsa ni se realiza ningún cobro.

## 2. Instalar, migrar y arrancar

Desde la raíz del repositorio:

```bash
npm install
npm test
npm run migrate
npm run dev
```

El backend debe escuchar en el puerto configurado (por defecto 3000). No ejecutes migraciones sobre producción sin respaldo y revisión previa.

## 3. Abrir la tienda

Abre `frontend/index.html` con Live Server para la página de inicio. El catálogo independiente está en `frontend/catalogo.html` y el panel administrativo en `frontend/admin.html`. Abre la carpeta `frontend` como raíz de Live Server para que los tres archivos compartan las rutas `assets/css/store.css` y `assets/js/store.js`. Por defecto el frontend usa `http://localhost:3000` como API. Si el backend está en otra dirección, añade dentro de `<head>`:

```html
<meta name="api-base-url" content="https://tu-api.example.com">
```

El backend debe permitir CORS desde el origen del frontend.

## 4. Pruebas manuales

- Catálogo: productos cargan desde PostgreSQL; busca por nombre, descripción o moto compatible y filtra por categoría.
- Detalle: abre un producto y revisa su galería si tiene imágenes.
- Carrito: añade varios productos, aumenta cantidades y quita productos.
- Pedido: completa nombre, correo, teléfono, departamento, ciudad, dirección y observaciones; crea un pedido con el modo de prueba activo. Debe aparecer el número de pedido y avisar que no hubo cobro.
- Administración: inicia sesión con un administrador ya creado en la base de datos; comprueba creación/edición/activación/eliminación de productos, carga de imágenes, gestión de categorías, listado/cambio de estado de pedidos, tarjetas de resumen y exportación CSV.
- Navegación: comprueba que Inicio, Catálogo y Admin abran sus páginas separadas.
- Imagen principal: coloca una imagen autorizada en `frontend/assets/images/hero-moto.jpg`; si no está, la página muestra un fondo de respaldo.
- Seguridad: verifica que las rutas de administración rechacen peticiones sin token y que la tienda pública siga funcionando sin iniciar sesión.
- Pago Wompi en sandbox: configura `PAYMENT_PROVIDER=wompi`, `WOMPI_ENVIRONMENT=sandbox`, una llave `pub_test_...`, `WOMPI_INTEGRITY_SECRET`, `WOMPI_EVENTS_SECRET` y `PUBLIC_BASE_URL` con la URL pública del frontend (la que contiene `pago-resultado.html`). Ejecuta `npm.cmd run migrate` y `npm.cmd test`; luego crea un pedido de prueba y confirma que abre el checkout de Wompi. Para recibir notificaciones, expón el backend mediante HTTPS y registra en el Dashboard de Wompi la URL de eventos completa `https://TU-DOMINIO-API/webhooks/wompi` (no la URL del frontend ni `localhost`). Verifica que una transacción aprobada actualice pedido y balance, y prueba también rechazo, firma inválida, reintento del webhook y referencia desconocida. Si una aprobación llega después de vencer la reserva de inventario, el pago queda marcado para revisión manual y no se confirma la venta automáticamente.
- Pago real: cambia a `WOMPI_ENVIRONMENT=production` y usa llaves de producción únicamente cuando sandbox haya pasado las pruebas, el backend esté publicado con HTTPS y la URL de eventos esté configurada. Nunca compartas ni subas secretos.

## Seguridad de credenciales

Nunca copies `.env`, tokens o contraseñas al repositorio. Si una credencial real estuvo publicada, revócala o cámbiala aunque luego se elimine el archivo: borrar el archivo no borra el historial de Git.
