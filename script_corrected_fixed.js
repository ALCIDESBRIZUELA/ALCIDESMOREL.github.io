var swiper = new Swiper(".myswiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination:{
        el: ".swiper-pagination",
        clickable:true,
    },
    navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

var swiper = new Swiper(".myswiper-2", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    breakpoints: {
        0:{
            slidesPerView: 1
        },
        520:{
            slidesPerView: 2
        },
        950:{
            slidesPerView: 3
        }
    }
});


//Carrito

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const elementos2 = document.getElementById('lista-2');
const elementos3 = document.getElementById('lista-3');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    elementos3.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100>
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;

    lista.appendChild(row);
}

function eliminarElemento(e){
    e.preventDefault();
    let elemento, 
        elementoId;

    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
}

// Testimonios
var swiperTestimonials = new Swiper(".myswiper-3", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Filtro de Precios
const priceFilter = document.getElementById('price-filter');
const priceValue = document.getElementById('price-value');

priceFilter.addEventListener('input', function() {
    priceValue.textContent = `$${this.value}`;
    // Ejemplo: aquí se puede implementar una lógica de filtro para ocultar productos que exceden el límite de precio.
});

// Alternar modo oscuro
const themeSwitch = document.getElementById("theme-switch");
themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});

// Funcionalidad de búsqueda
const searchBar = document.getElementById("search-bar");
const products = document.querySelectorAll(".categorie, .product");

searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    products.forEach(product => {
        const textContent = product.textContent.toLowerCase();
        product.style.display = textContent.includes(query) ? "block" : "none";
    });
});

// Carga diferida de imágenes
const lazyImages = document.querySelectorAll("img");
lazyImages.forEach(img => {
    img.setAttribute("loading", "lazy");
});

// Notificaciones para agregar al carrito
function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "#4caf50";
    notification.style.color = "#fff";
    notification.style.padding = "10px 20px";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Actualizar la función Agregar al carrito
function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
        showNotification("Producto añadido al carrito.");
    }
}

// Verificar existencia del botón y asociar evento
const checkoutButton = document.getElementById('checkout-carrito');
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        const rows = lista.querySelectorAll('tr');
        if (rows.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de comprar.');
            return;
        }

        let total = 0;
        rows.forEach(row => {
            const price = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('$', ''));
            total += price;
        });

        alert(`Gracias por su compra. Total a pagar: $${total.toFixed(2)}`);
        vaciarCarrito(); // Vaciar carrito después de la compra.
    });
}

// Calculate total and simulate purchase
checkoutButton.addEventListener('click', () => {
    const rows = lista.querySelectorAll('tr');
    if (!rows || rows.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de comprar.');
        return;
    }
    
    let total = 0;
    rows.forEach(row => {
        const priceElement = row.querySelector('td:nth-child(3)');
        if (priceElement) {
            const price = parseFloat(priceElement.textContent.replace('$', '').trim());
            if (!isNaN(price)) {
                total += price;
            }
        }
    });
    
    if (total > 0) {
        alert(`Compra realizada exitosamente. Total a pagar: $${total.toFixed(2)}`);
        vaciarCarrito(); // Vaciar carrito después de la compra.
    } else {
        alert('Error al calcular el total. Inténtalo nuevamente.');
    }
});

// Remove duplicate checkout buttons if they exist
const duplicateCheckoutButtons = carrito.querySelectorAll('#checkout-carrito');
if (duplicateCheckoutButtons.length > 1) {
    duplicateCheckoutButtons[1].remove();
}



// Mostrar monto total y agradecimiento
checkoutButton.addEventListener('click', () => {
    const rows = lista.querySelectorAll('tr');
    if (rows.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de comprar.');
        return;
    }

    let total = 0;
    rows.forEach(row => {
        const price = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('$', ''));
        total += price;
    });

    alert(`Gracias por su compra. Total a pagar: $${total.toFixed(2)}`);
    vaciarCarrito(); // Vaciar carrito después de la compra.
});

// Validaciones en formulario de pago
paymentDetails.addEventListener('submit', (e) => {
    e.preventDefault();
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Número de tarjeta inválido. Deben ser 16 dígitos.');
        return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Fecha de vencimiento inválida. Formato: MM/AA.');
        return;
    }
    if (!/^\d{3}$/.test(cvv)) {
        alert('CVV inválido. Deben ser 3 dígitos.');
        return;
    }

    alert('Pago exitoso. ¡Gracias por su compra!');
    form.remove();
    vaciarCarrito();
});
