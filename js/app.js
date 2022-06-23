const btnBuy = document.getElementById("buy")
const carritoCanvas = document.getElementById('lista-carrito')
const spanCantidadProd = document.querySelector('.cantidad-prod');
const btnCarrito = document.querySelector('.btn-cart');

class Producto {
    constructor(nombre, srcImagen, precio, id) {
        this.id = id;
        this.nombre = nombre;
        this.srcImagen = srcImagen;
        this.precio = precio;
    }
}

class productoACarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

let carrito = [];


function app() {
    asignarId()
    document.addEventListener('click', agregarCarrito);
}

function agregarCarrito(e) {
    const elementoSeleccionado = e.target;
    let productoSeleccionado;
    e.preventDefault();
    if (e.target.classList.contains('card-buy')) {
        carrito.length==0 ? btnCarrito.click() : '' ;
        spanCantidadProd.textContent == '' ? spanCantidadProd.textContent = 1 : spanCantidadProd.textContent++;
        productoSeleccionado = elementoSeleccionado.parentElement.parentElement.parentElement;
        leerDatosCurso(productoSeleccionado);
    }
}

function leerDatosCurso(producto) {
    let nombre = producto.querySelector('.card-title').textContent;
    let imagen = producto.querySelector('img').src;
    let precio = producto.querySelector('.precio').textContent;
    let id = producto.id;
    const nuevoProducto = new Producto(nombre, imagen, precio, id);
    actualizarCarrito(nuevoProducto);
}

function actualizarCarrito(nuevoProducto) {
    const prodEncontrado = carrito.find(prod => prod.producto.id == nuevoProducto.id)
    if (prodEncontrado != undefined)
        prodEncontrado.cantidad++;
    else {
        const cargarProducto = new productoACarrito(nuevoProducto, 1);
        carrito.push(cargarProducto)
    }
    carritoUI();
}

function carritoUI() {
    limpiarCarrito = () => {
        carritoCanvas.innerHTML = ''
    }
    limpiarCarrito();
    carrito.forEach(prod => {
        let detalleProducto = document.createElement('div')
        detalleProducto.innerHTML = `
        <div class="producto-carrito" id="${prod.producto.id}">
            <div class="d-flex justify-content-between">
            <img src="${prod.producto.srcImagen}" style="width:70px;" alt="...">
            <h5 class="card-title fw-bold text-center">${prod.producto.nombre}</h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div class="d-block m-2">
            <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-center">
                <label>Cantidad</label>
                <input style="width:50px" class="mx-2" type="number" value="${prod.cantidad}">
                </div>
                <span class="fw-bold precio fs-5">${prod.producto.precio}</span>
            </div>
            </div>
        </div>`
        carritoCanvas.append(detalleProducto);
    })
}

function asignarId() {
    const productoArray = document.querySelectorAll('.producto');
    productoArray.forEach(prod => {
        prod.querySelector('.card').id = Math.random().toString(36).substr(2, 9);;
    })
}

app();