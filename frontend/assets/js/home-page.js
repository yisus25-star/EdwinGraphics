(() => {
  const apiBase = (document.querySelector('meta[name="api-base-url"]')?.content || 'http://localhost:3000').replace(/\/+$/, '');
  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const imageUrl = value => !value ? '' : (/^https?:\/\//i.test(value) ? value : apiBase + (value.startsWith('/') ? value : '/' + value));
  const price = value => {
    if (value === null || value === undefined || value === '') return 'Consultar precio';
    const number = Number(value);
    return Number.isFinite(number) ? '$' + number.toLocaleString('es-CO') : escapeHtml(value);
  };
  const rowsFrom = data => Array.isArray(data) ? data : (data?.productos || data?.categorias || data?.data?.productos || []);
  async function get(path) {
    const response = await fetch(apiBase + path);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.success === false) throw new Error(payload.message || 'No se pudo cargar el contenido');
    return payload.data ?? payload;
  }
  function goCatalog(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key,value]) => { if (value !== undefined && value !== null && String(value).trim()) query.set(key, String(value).trim()); });
    window.location.href = 'catalogo.html' + (query.toString() ? '?' + query.toString() : '');
  }
  function setupSearch() {
    const form = $('#homeHeaderSearch');
    const input = $('#homeHeaderSearchInput');
    if (!form || !input) return;
    form.addEventListener('submit', event => { event.preventDefault(); goCatalog({q: input.value}); });
  }
  function setupHero(products) {
    const host = $('#homeHeroSlides');
    const dots = $('#homeHeroDots');
    if (!host || !dots) return;
    const featured = products.filter(item => item.imagen_principal_thumbnail || item.imagen_principal || item.img).slice(0,5);
    const slides = featured.length ? featured : [];
    if (!slides.length) return;
    host.innerHTML = slides.map((product,index) => {
      const src = imageUrl(product.imagen_principal_thumbnail || product.imagen_principal || product.img);
      const name = escapeHtml(product.nombre || product.name || 'Diseño destacado EdwinGraphics');
      return '<div class="home-hero-slide' + (index === 0 ? ' is-active' : '') + '"><img src="' + escapeHtml(src) + '" alt="' + name + '" ' + (index ? 'loading="lazy"' : 'fetchpriority="high"') + ' onerror="this.parentElement.remove()"></div>';
    }).join('');
    const validSlides = Array.from(host.querySelectorAll('.home-hero-slide'));
    if (!validSlides.length) return;
    let active = 0;
    const caption = $('#homeHeroCaption');
    const render = index => {
      active = (index + validSlides.length) % validSlides.length;
      validSlides.forEach((slide,i) => slide.classList.toggle('is-active',i === active));
      dots.innerHTML = validSlides.map((_,i) => '<button type="button" aria-label="Mostrar imagen ' + (i+1) + '" aria-current="' + (i === active ? 'true' : 'false') + '" data-slide="' + i + '"></button>').join('');
      if (caption) caption.textContent = slides[active].nombre || slides[active].name || 'Diseños destacados para tu moto';
    };
    dots.addEventListener('click', event => { const button = event.target.closest('[data-slide]'); if (button) render(Number(button.dataset.slide)); });
    $('#homeHeroPrev')?.addEventListener('click',() => render(active-1));
    $('#homeHeroNext')?.addEventListener('click',() => render(active+1));
    render(0);
    if (validSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) window.setInterval(() => render(active+1),5500);
  }
  function renderCategories(categories, products) {
    const grid = $('#homeCategoryGrid');
    if (!grid) return;
    if (!categories.length) { grid.innerHTML = '<div class="home-loading-card">Pronto encontrarás aquí nuestras categorías.</div>'; return; }
    grid.innerHTML = categories.slice(0,10).map(category => {
      const product = products.find(item => Number(item.categoria_id) === Number(category.id) && (item.imagen_principal_thumbnail || item.imagen_principal || item.img));
      const src = imageUrl(product?.imagen_principal_thumbnail || product?.imagen_principal || product?.img || '');
      return '<a class="home-category-card" href="catalogo.html?categoria=' + encodeURIComponent(category.id) + '">' +
        (src ? '<img loading="lazy" src="' + escapeHtml(src) + '" alt="Productos de ' + escapeHtml(category.nombre) + '" onerror="this.remove()">' : '') +
        '<span class="home-category-card-content"><strong>' + escapeHtml(category.nombre) + '</strong><i class="fa-solid fa-arrow-right"></i></span></a>';
    }).join('');
  }
  function renderFeatured(products) {
    const grid = $('#homeFeaturedGrid');
    if (!grid) return;
    const featured = products.filter(item => item.imagen_principal_thumbnail || item.imagen_principal || item.img).slice(0,4);
    if (!featured.length) { grid.innerHTML = '<div class="home-loading-card">Estamos preparando nuestros productos destacados. Visita el catálogo para conocer la disponibilidad.</div>'; return; }
    grid.innerHTML = featured.map(product => {
      const name = product.nombre || product.name || 'Producto EdwinGraphics';
      const src = imageUrl(product.imagen_principal_thumbnail || product.imagen_principal || product.img);
      return '<article class="home-product-card"><a class="home-product-image" href="catalogo.html" aria-label="Ver ' + escapeHtml(name) + ' en el catálogo"><img loading="lazy" src="' + escapeHtml(src) + '" alt="' + escapeHtml(name) + '" onerror="this.parentElement.innerHTML=\'<span class=&quot;home-loading-card&quot;>EDWINGRAPHICS</span>\'"><span class="home-product-badge"><i class="fa-solid fa-fire"></i> DESTACADO</span></a><div class="home-product-info"><small>' + escapeHtml(product.categoria_nombre || product.tag || 'CALCOMANÍAS') + '</small><h3>' + escapeHtml(name) + '</h3><div class="home-product-bottom"><strong class="home-product-price">' + price(product.precio ?? product.price) + '</strong><a class="home-product-link" href="catalogo.html">Ver producto <i class="fa-solid fa-arrow-right"></i></a></div></div></article>';
    }).join('');
  }
  async function initHome() {
    setupSearch();
    const categoryGrid = $('#homeCategoryGrid');
    const productGrid = $('#homeFeaturedGrid');
    if (!categoryGrid && !productGrid) return;
    try {
      const [categoryData, bestData, productData] = await Promise.all([
        get('/categorias'),
        get('/productos/mas-vendidos?limit=5').catch(() => []),
        get('/productos?limit=100&sort=created_at&order=desc').catch(() => [])
      ]);
      const categories = rowsFrom(categoryData);
      const best = rowsFrom(bestData);
      const allProducts = rowsFrom(productData);
      const heroProducts = best.length ? best : allProducts;
      setupHero(heroProducts);
      renderCategories(categories, allProducts);
      renderFeatured(best.length ? best : allProducts);
    } catch (error) {
      console.warn('No se pudo cargar el contenido dinámico del inicio:', error.message);
      if (categoryGrid) categoryGrid.innerHTML = '<div class="home-loading-card">No pudimos cargar las categorías. Comprueba que el backend esté activo.</div>';
      if (productGrid) productGrid.innerHTML = '<div class="home-loading-card">No pudimos cargar los productos destacados. Visita el catálogo.</div>';
    }
  }
  document.addEventListener('DOMContentLoaded',initHome);
})();
