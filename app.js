const contenedorProductos = document.getElementById("productos");
const inputBusqueda = document.getElementById("busqueda");
const contenedorCategorias = document.getElementById("categorias");

let productos = [];
let categoriaSeleccionada = "all";

async function cargarProductos() {
  try {
    mostrarMensaje("Cargando productos...");
    const respuesta = await fetch("https://fakestoreapi.com/products");

    if (!respuesta.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    productos = await respuesta.json();

    if (productos.length === 0) {
      mostrarMensaje("No hay productos disponibles en este momento.");
    } else {
      mostrarProductos(productos);
    }
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    mostrarMensaje("No se pudieron cargar los productos. Intenta más tarde.");
  }
}

async function cargarCategorias() {
  try {
    const respuesta = await fetch(
      "https://fakestoreapi.com/products/categories"
    );

    if (!respuesta.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const categorias = await respuesta.json();

    //Mostrar Categorias
    mostrarCategorias(["all", ...categorias]);
  } catch (error) {
    console.error("Error al cargar categorias:", error);
  }
}

function filtrarProductos() {
  let filtrados = productos;

  //Filtrar por categoria
  if (categoriaSeleccionada !== "all") {
    filtrados = filtrados.filter((p) => p.category === categoriaSeleccionada);
  }

  const texto = inputBusqueda.value.toLowerCase();

  if (texto.trim() !== "") {
    filtrados = filtrados.filter(
      (p) =>
        p.title.toLowerCase().includes(texto) ||
        p.description.toLowerCase().includes(texto)
    );
  }

  mostrarProductos(filtrados);
}

function mostrarMensaje(mensaje) {
  contenedorProductos.innerHTML = `
      <p class="text-center col-span-full text-gray-500">${mensaje}</p>
`;
}

function mostrarCategorias(categorias) {
  contenedorCategorias.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas categorías
  categorias.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent =
      cat === "all" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.className = `px-4 py-2 rounded-full ${
      categoriaSeleccionada === cat
        ? "bg-blue-500 text-white"
        : "bg-blue-100 text-blue-500"
    } font-semibold shadow transition hover:bg-blue-200`;

    btn.addEventListener("click", () => {
      categoriaSeleccionada = cat;
      mostrarCategorias(categorias);
      filtrarProductos();
    });

    contenedorCategorias.appendChild(btn);
  });
}

function mostrarProductos(productos) {
  contenedorProductos.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.className =
      "bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300";

    productoDiv.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" class="w-32 h-32 object-contain mb-4">
      <h3 class="text-lg font-semibold mb-2 text-center">${producto.title}</h3>
      <p class="text-gray-600 mb-2">$${producto.price}</p>
      <button class="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Agregar al carrito</button>
      <a href="Endetalle.html?id=${producto.id}" 
   class="mt-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded block text-center">
  Detalles
</a>

    `;
    contenedorProductos.appendChild(productoDiv);
  });
}

inputBusqueda.addEventListener("input", filtrarProductos);

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  cargarCategorias();
});
  
//cerrar sesion
document.addEventListener('DOMContentLoaded', () => {
  const btnCerrarSesion = document.getElementById('btnCerrarSesion');
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirige al login
    window.location.href = 'login.html';
  } else {
    // Muestra el boton de cerrar sesión
    btnCerrarSesion.classList.remove('hidden');
  }

  btnCerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });
});

//ubicacion
function initMap() {
  const instituto = { lat: -0.3393815, lng: -78.4397558 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: instituto,
  });
  const marker = new google.maps.Marker({
    position: instituto,
    map: map,
    title: "Instituto Rumiñahui",  // Tooltip clásico al pasar mouse
  });
}
// Cargar el mapa al cargar la pagina
window.onload = function () {
  initMap();
};