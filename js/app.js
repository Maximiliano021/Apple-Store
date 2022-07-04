let btnBuy, carritoCanvas, spanCantidadProd, btnCarrito, mainHTML;
let carrito = [];

class Producto {
    constructor(nombre, srcImagen, precio, id) {
        this.nombre = nombre;
        this.srcImagen = srcImagen;
        this.precio = precio;
        this.id = id;
    }
}

const productos = [
    new Producto("MacBook Pro 13", "https://assets.website-files.com/61dc3065b01374683eceee5d/62028b0600efe2383e89ce48_Mac%20Book%204.png", 120.299, 1),
    new Producto("iPad Pro Plus", "https://assets.website-files.com/61dc3065b01374683eceee5d/61f14c7ad4a814ec84c8e432_Tablet%20Image%204-min.png", 10.206, 2),
    new Producto("iPhone 13", "https://assets.website-files.com/61dc3065b01374683eceee5d/6237a802d5477fa1916810ea_Phone%20Image%204.png", 110.182, 3),
    new Producto("Smartwatch FK88", "https://d3ugyf2ht6aenh.cloudfront.net/stores/403/699/products/16002-rosa-frente21-a978a8128bcc6bcacd16082306034201-1024-1024.png", 92.361, 4),
    new Producto("Airpod Pro", "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1591634795000", 51.213, 5),
]

class productoACarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioTotal = this.producto.precio;
    }
    calcularTotal(){
        return this.precioTotal = (this.producto.precio * this.cantidad).toFixed(3);
    }    
}

function app() {
    crearHTML()
    document.addEventListener('click', eventoClick);
    document.addEventListener('change', inputCantidad);
}

let crearHTML = () => {
    let main = document.createElement('div');
    main.innerHTML = `
        <div class="row m-4 main container">                           
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">COMPRA</h5>
                            <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
        </div>`;
    main.classList.add('container')
    document.querySelector('body').append(main);
    mainHTML = document.querySelector('.main');
    mostrarProductos();
}

function eventoClick(e) {
    const elementoSeleccionado = e.target;
    if (elementoSeleccionado.classList.contains('agregar') || (elementoSeleccionado.classList.contains('buy-prod'))) {
        let productoDevuelto = productos.find(e => e.id == elementoSeleccionado.id);
        elementoSeleccionado.classList.contains('buy-prod') ? actualizarCarrito(productoDevuelto) : btnCarrito.click(); detalleProducto(productoDevuelto);
    }
    if (elementoSeleccionado.classList.contains('btn-deleteProd'))
        eliminarCarritoUI(elementoSeleccionado);
    if (elementoSeleccionado.classList.contains('no-buy'))
        btnCloseCanvas.click()
}


function actualizarCarrito(nuevoProducto) {
    const prodEncontrado = carrito.find(prod => prod.producto.id == nuevoProducto.id)
    if (prodEncontrado != undefined){
        prodEncontrado.cantidad++;
        prodEncontrado.calcularTotal();
    }
    else {
        const cargarProducto = new productoACarrito(nuevoProducto, 1);
        carrito.push(cargarProducto)
    }
    carritoUI();
}

function carritoUI() {
    carritoCanvas.innerHTML = '';
    totalCantidad = 0;
       
    carrito.forEach(prod => {
        let detalleProducto = document.createElement('div')
        detalleProducto.innerHTML = `
            <div class="d-flex justify-content-between">
                <img src="${prod.producto.srcImagen}" class="img-prod-carrito" alt="...">
                <h5 class="card-title fw-bold text-center">${prod.producto.nombre}</h5>
                <button type="button" class="btn-close btn-deleteProd" id="${prod.producto.id}" aria-label="Close"></button>
                </div>
                <div class="d-block m-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex justify-content-center">
                    <label>Cantidad</label>
                    <input style="width:50px" class="mx-2 inputCantidad" id="${prod.producto.id}" type="number" min="1" value="${prod.cantidad}">
                    </div>
                    <span class="fw-bold precio fs-5">$${prod.precioTotal} USD</span>
                </div>
            </div>`;
        totalCantidad += prod.cantidad;
        detalleProducto.classList.add('producto-carrito');
        carritoCanvas.append(detalleProducto);
    })
    totalCantidad==0? spanCantidadProd.textContent = '' 
    : spanCantidadProd.textContent = totalCantidad;
}

function mostrarProductos() {
    productos.forEach(producto => {
        productoHTML = document.createElement('div');
        productoHTML.innerHTML = `
            <div class="card" style="width: 16rem;" <div class="card" style="width: 16rem;" data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="${producto.id}00"
            data-aos-offset="0">
                <div class="bg-white contain-img p-3">
                <img src="${producto.srcImagen}" class="card-img-top prod-img" alt="...">
                </div>
                <div class="card-body">
                <h5 class="card-title fw-bold text-center">${producto.nombre}</h5>
                <p class="card-text">and make up the bulk of the card's content.</p>
                <div class="d-flex justify-content-between">
                    <span class="fw-bold precio fs-6">$${producto.precio} USD</span>
                    <!-- <a href="#" id="${producto.id}" class="btn btn-primary card-buy" data-bs-target="#exampleModal">AGREGAR</a> -->
                    <button type="button" id="${producto.id}" class="btn btn-primary agregar" data-bs-toggle="modal" data-bs-target="#exampleModal">AGREGAR</button>
                </div>
                </div>
                </div>
            </div>   `;
        productoHTML.classList.add('col', 'producto');
        mainHTML.append(productoHTML);
        btnBuy = document.querySelector(".card-buy");
        carritoCanvas = document.getElementById('lista-carrito');
        spanCantidadProd = document.querySelector('.cantidad-prod');
        btnCarrito = document.querySelector('.btn-cart');
        btnCloseCanvas = document.querySelector('.close-canvas')
    })
}

function inputCantidad(e) {
    const inputSeleccionado = e.target;
    if (inputSeleccionado.classList.contains('inputCantidad')) {
        const valorNuevo = e.target.value;
        const elegido = carrito.find(e => e.producto.id == inputSeleccionado.id)
        if (valorNuevo != '') {
            elegido.cantidad = Number(valorNuevo)
            elegido.calcularTotal();
            carritoUI()
        }
    }
}

function detalleProducto(selectProducto) {
    let modalBody = document.querySelector('.modal-body');
    let modalFooter = document.querySelector(".modal-footer");
    let detalle = document.createElement('div');
    document.querySelector('.close-modal').click();
    
    modalFooter.textContent = '';
    modalBody.textContent = '';
    modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary no-buy" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary buy-prod" data-bs-dismiss="modal" id="${selectProducto.id}">Aceptar</button>
        `;
    detalle.innerHTML = `
        <div class="row">
            <div class="col">
                <img src="${selectProducto.srcImagen}" style="width:10rem;">
            </div>
            <div class="col">
                <h3 class="mb-4">${selectProducto.nombre}</h3>
                <div class="row">
                        <label>PRECIO: </label>
                        <span class="fw-bold">$${selectProducto.precio}</span>
                </div>
            </div>
        </div>`;
    detalle.classList.add('container');
    modalBody.append(detalle);
}

function eliminarCarritoUI(elemento){
    let prodCarrito = carrito.find(prod=>prod.producto.id == elemento.id)
    eliminarCarrito(prodCarrito)
    carritoUI();
}

function eliminarCarrito(prodCarrito){
    carrito = carrito.filter(prod=>prod.producto.id != prodCarrito.producto.id)
}
app();