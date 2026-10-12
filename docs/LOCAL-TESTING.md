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
- Pago real: desactiva el modo MOCK únicamente después de configurar credenciales de Shopify, dominio, secretos de webhook y suscripciones de webhooks necesarias.

## Seguridad de credenciales

Nunca copies `.env`, tokens o contraseñas al repositorio. Si una credencial real estuvo publicada, revócala o cámbiala aunque luego se elimine el archivo: borrar el archivo no borra el historial de Git.
