// Array de productos (deberás completar con tus datos reales)
const productos = [
    {
        id: 1,
        nombre: "Taza Mágica Catamarca",
        precio: 2500,
        categoria: "tazas",
        imagen: "img/productos/taza-magica.jpg",
        descripcion: "Taza que cambia de color con el calor"
    },
    {
        id: 2,
        nombre: "Botella Térmica Montaña",
        precio: 4200,
        categoria: "botellas",
        imagen: "img/productos/botella-termica.jpg",
    },
    {
        id: 3,
        nombre: "Remera Algodón 'Cactus'",
        precio: 3800,
        categoria: "remeras",
        imagen: "img/productos/remera-cactus.jpg",
    },
    {
        id: 4,
        nombre: "Taza Cerámica Blanca",
        precio: 1800,
        categoria: "tazas",
        imagen: "img/productos/taza-blanca.jpg",
    },
    {
        id: 5,
        nombre: "Llavero Personalizado",
        precio: 900,
        categoria: "llaveros",
        imagen: "img/productos/llavero.jpg",
    },
    // Agrega todos los productos que tengas, con sus categorías reales
];

// Categorías disponibles (se generan automáticamente a partir de productos)
function obtenerCategoriasUnicas() {
    const categorias = productos.map(p => p.categoria);
    return ['todos', ...new Set(categorias)];
}

// Renderizar filtros
function renderizarFiltros() {
    const container = document.getElementById('filtros-container');
    const categorias = obtenerCategoriasUnicas();
    
    container.innerHTML = categorias.map(cat => {
        const nombreMostrar = cat.charAt(0).toUpperCase() + cat.slice(1);
        return `<button class="btn-filtro ${cat === 'todos' ? 'activo' : ''}" data-categoria="${cat}">${nombreMostrar}</button>`;
    }).join('');
    
    // Agregar event listeners
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
            const categoriaSeleccionada = btn.dataset.categoria;
            filtrarProductos(categoriaSeleccionada);
        });
    });
}

// Filtrar y mostrar productos
function filtrarProductos(categoria) {
    const productosFiltrados = categoria === 'todos' 
        ? productos 
        : productos.filter(p => p.categoria === categoria);
    
    renderizarProductos(productosFiltrados);
}

// Renderizar tarjetas de productos
function renderizarProductos(lista) {
    const grid = document.getElementById('productos-container');
    const noResultados = document.getElementById('no-resultados');
    
    if (lista.length === 0) {
        grid.innerHTML = '';
        noResultados.classList.remove('oculto');
        return;
    }
    
    noResultados.classList.add('oculto');
    
    grid.innerHTML = lista.map(prod => {
        // Formatear precio con separador de miles y símbolo $
        const precioFormateado = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(prod.precio);
        
        // Mensaje predefinido para WhatsApp
        const mensaje = encodeURIComponent(`¡Hola! Vi en la web *${prod.nombre}* a ${precioFormateado}. ¿Podrían darme más info?`);
        const whatsappLink = `https://wa.me/5493834771828?text=${mensaje}`;
        
        return `
            <div class="producto-card">
                <img src="${prod.imagen}" alt="${prod.nombre}" class="producto-img" loading="lazy">
                <div class="producto-info">
                    <span class="producto-categoria">${prod.categoria}</span>
                    <h3 class="producto-nombre">${prod.nombre}</h3>
                    <div class="producto-precio">${precioFormateado}</div>
                    <a href="${whatsappLink}" target="_blank" class="btn-whatsapp-producto">
                        <i class="fab fa-whatsapp"></i> Consultar
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

// Inicializar catálogo
function iniciarCatalogo() {
    renderizarFiltros();
    renderizarProductos(productos); // Muestra todos al inicio
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', iniciarCatalogo);
