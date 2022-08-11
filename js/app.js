let btnBuy, carritoCanvas, spanCantidadProd, btnCarrito, mainHTML, allProductos, modalBody, modalFooter;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let modoOscuro = localStorage.getItem('modoOscuro') == 'true'? true : false;

const productos = [];

class productoACarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioTotal = this.producto.precio;
    }
}

getJSON();

function getJSON() {
    fetch('js/JSONproductos.json')
        .then(res => res.json())
        .then(producto => {
            producto.forEach((prod) => {
                productos.push(prod);
            });
            initiatePage();
        })
        .catch(() => error404());
}

const initiatePage = () => {
    crearHTML();
    carritoUI();
    mostrarProductos();
    cambiarEstilo(modoOscuro);
    document.addEventListener('click', eventosClick);
}

const error404 = () => {
    document.querySelector('body').innerHTML = '';
    document.querySelector('body').classList.add('d-flex', 'text-center', 'vh-100');
    const error = document.createElement('div');
    error.innerHTML = `<h1>ERROR 404</h1><p>Page not found</p>`;
    error.classList.add('error');
    document.querySelector('body').append(error);
}

let crearHTML = () => {
    let main = document.createElement('div');
    main.innerHTML = `
        <div class="row mx-4 my-0 container">                           
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">COMPRA</h5>
                            <a type="button" class="close-modal" data-bs-dismiss="modal" aria-label="Close"></a>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
            <div class="main" data-aos="fade-zoom-in" data-aos-delay="100">
                <div class="categoria row" id="MACBOOK"></div>
                <div class="categoria row" id="IPAD"></div>
                <div class="categoria row" id="IPHONE"></div>
                <div class="categoria row" id="WATCH"></div>
                <div class="categoria row" id="AIRPOD"></div>
                <div class="categoria all-productos"></div>
            </div>
        </div>`;
    main.classList.add('container')
    document.querySelector('.content').append(main);
    asignarClassId();
}

function mostrarProductos() {
    let delay = 50, contentCagoria, categoria;
    productos.forEach(producto => {
        categoria = document.getElementById(`${producto.categoria}`);
        contentCagoria = document.createElement('div');
        productoHTML = document.createElement('div');

        productoHTML.innerHTML = `
            <div class="card bg-transparent" style="width: 16rem;" data-aos="fade-zoom-in" data-aos-delay="${delay}">
                <div class="contain-img p-3 bg-white">
                    <img src="${producto.srcImagen}" class="card-img-top prod-img" alt="${producto.nombre}">
                </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold text-center">${producto.nombre}</h5>
                    <p class="card-text fw-light">and make up the bulk of the card's content.</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold precio fs-6">$${producto.precio} USD</span>
                        <button type="button" id="${producto.id}" class="btn btn-primary agregar" data-bs-toggle="modal" data-bs-target="#exampleModal">COMPRAR</button>
                    </div>
                </div>
            </div>`;
        delay = transicionDelay(delay);
        contentCagoria.innerHTML = `
            <h3 class="fw-bolder">LO MEJOR DE LA CATEGORIA ${producto.categoria}</h3><p class="w-50">${lorem()}</p>`;

        if (categoria.textContent == '')
            categoria.append(contentCagoria);

        productoHTML.classList.add('col', 'producto');
        categoria.append(productoHTML);
    })
}


function eventosClick(e) {
    const targetSelect = e.target;
    let productoDevuelto = productos.find(e => e.id == targetSelect.id);

    if (targetSelect.classList.contains('buy-prod')){ 
        e.preventDefault();
        actualizarCarrito(productoDevuelto)
    }

    if (targetSelect.classList.contains('btn-mod')){
        if(modoOscuro){
            modoOscuro = false;
            mostrarAlert('Modo Light');
        }
        else{
            modoOscuro = true;
            mostrarAlert('Modo Oscuro');
        } 
        localStorage.setItem('modoOscuro', modoOscuro);
        cambiarEstilo(modoOscuro);
    }
    if (targetSelect.classList.contains('agregar')) {
        abrirCanvas();
        detalleEnModal(productoDevuelto);
    }

    if (targetSelect.classList.contains('delete-prod'))
        eliminarDeCarrito(targetSelect);

    if (targetSelect.classList.contains('no-buy'))
        btnCloseCanvas.click();

    if (targetSelect.classList.contains('inputCantidad'))
        actualizarInput(targetSelect);
}

function actualizarCarrito(nuevoProducto) {
    const prodEncontrado = carrito.find(prod => prod.producto.id == nuevoProducto.id)

    if (prodEncontrado == undefined) {
        const cargarProducto = new productoACarrito(nuevoProducto, 1);
        carrito.push(cargarProducto);
    }
    else {
        prodEncontrado.cantidad++;
        prodEncontrado.precioTotal += prodEncontrado.precioTotal;
    }
    mostrarAlert('Agregado');
    actualizarLocalStorage();
    carritoUI();
}

function carritoUI() {
    let totalSuma = 0;
    let totalCantidad = 0;
    let detalle;
    carritoCanvas.innerHTML = '';
    carrito.forEach(prod => {
        detalle = document.createElement('div')
        detalle.innerHTML = `
            <div class="d-flex justify-content-between">
                <div class="container-img">
                    <img src="${prod.producto.srcImagen}" class="img-prod-carrito" alt="...">
                </div>
                
                <h5 class="card-title fw-bold text-center">${prod.producto.nombre}</h5>
                <i class='bx bxs-trash-alt bx-sm delete-prod' id="${prod.producto.id}"></i>
                </div>
                <div class="d-block m-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex justify-content-center">
                    <label>Cantidad</label>
                    <input style="width:50px" onfocus="blur();" class="mx-2 inputCantidad" id="${prod.producto.id}" type="number" min="1" value="${prod.cantidad}">
                    </div>
                    <span class="fw-bold precio fs-5">$${prod.precioTotal}  USD</span>
                </div>
            </div>`;
        totalCantidad += prod.cantidad;
        detalle.classList.add('producto-carrito');
        carritoCanvas.append(detalle);
    })
    carrito.map(prod => totalSuma += prod.producto.precio * prod.cantidad)
    document.getElementById('totalCarrito').textContent = `$${totalSuma.toFixed(2)}`;

    //actualiza cantidad de productos en el html 
    totalCantidad == 0 ? spanCantidadProd.textContent = ''
        : spanCantidadProd.textContent = totalCantidad;
}

function detalleEnModal(selectProducto) {
    document.querySelector('.close-modal').click();
    let detalle = document.createElement('div');

    modalFooter.textContent = '';
    modalBody.textContent = '';
    modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary no-buy" data-bs-dismiss="modal">Cancelar</button>
        `;
    detalle.innerHTML = `
        <div class="row d-flex justify-content-center align-items-center p-sm-0 ">
            <div class="d-block col-12 col-lg-6 col-mb-2 justify-content-center">
            <img src="${selectProducto.srcImagen}" class="card-img card-img-top" alt="...">
            </div>
            <div class="col-11 col-lg-6 col-mb-10 justify-content-start p-1 p-lg-0 my-3 my-lg-0">
            <div class="description col-12 col-lg-12">
                <h2 class="description-title mb-4">${selectProducto.nombre}</h2>
                <p class="descripcion-producto mb-3">${lorem()}</p>
                <div class="col-12 col-lg-6 d-lg-block d-flex justify-content-lg-center justify-content-between  align-items-center">
                <div class="col-5 my-1 d-flex justify-content-lg-start justify-content-between align-items-center">
                    <span class="fs-3 precio fw-bold">${selectProducto.precio}</span>
                    <label class="text-center descuento mx-3 pb-1 pe-2 ps-2">50%</label>
                </div>
                <strike class="opacity-25 fw-bold">$250.00</strike>
                </div>
            </div>
            <form class="mx-auto my-lg-0 mx-lg-0 d-lg-flex d-block justify-content-start col-10 col-lg-12 align-items-center">
                <div class="d-flex justify-content-lg-center justify-content-between">
                    <button data-bs-dismiss="modal" class="btn btn-primary buy-prod" id="${selectProducto.id}">
                      AGREGAR
                  </button>
                </div>
            </form>
            </div>
        </div>`;

    detalle.classList.add('container');
    modalBody.append(detalle);
    estiloModal();
}

function eliminarDeCarrito(elemento) {
    let prodCarrito = carrito.find(prod => prod.producto.id == elemento.id);
    carrito = carrito.filter(prod => prod.producto.id != prodCarrito.producto.id);
    actualizarLocalStorage();
    carritoUI();
}

function lorem() {
    return "Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum has been the industry's standard dummy text ever since."
}

function asignarClassId() {
    modalBody = document.querySelector('.modal-body')
    modalFooter = document.querySelector('.modal-footer')
    spanCantidadProd = document.querySelector('.cantidad-prod');
    btnCarrito = document.querySelector('.btn-cart');
    mainHTML = document.querySelector('.main');
    allProductos = document.querySelector('.all-productos');
    btnCloseCanvas = document.querySelector('.close-canvas');
    carritoCanvas = document.getElementById('lista-carrito');
}


function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarAlert(mensaje) {
    Toastify({
        text: mensaje,
        duration: 1500,
        position: "center"
    }).showToast();
}

function actualizarInput(targetSelect) {
    const elegido = carrito.find(e => e.producto.id == targetSelect.id);
    if (targetSelect.value != '') {
        elegido.cantidad = Number(targetSelect.value)
        elegido.precioTotal = Number((elegido.cantidad * elegido.producto.precio).toFixed(2));
        carritoUI();
    }
    actualizarLocalStorage();
}

const abrirCanvas = () => btnCarrito.click();

const transicionDelay = (delay)=>{
    return delay == 150 ? delay = 50 : delay += 50;
}

function cambiarEstilo(modoOscuro){
    let catalogo = document.querySelector('.content');
    let carritoBody = document.querySelector('.offcanvas-body');
    let carritoFooter = document.querySelector('.offcanvas-footer');
    let carritoFooterText = document.querySelector('.text-canvas-footer');
    let listaCardBody = document.querySelectorAll('.card-body');
    let footerHeader = document.querySelector('.footer-header');
    let footerMain = document.querySelector('.footer-main');
    
    if(modoOscuro){
        catalogo.classList.add('bg-dark', 'text-light');
        carritoBody.classList.add('bg-dark','box-light','text-light')
        carritoFooter.classList.add('bg-secondary');
        carritoFooterText.classList.add('text-light');
        listaCardBody.forEach(card=>card.classList.add('box-light'));
        footerHeader.classList.add('bg-secondary', 'bg-opacity-10')
        footerMain.classList.add('bg-secondary', 'bg-opacity-50');
    }
    else{
        catalogo.classList.remove('bg-dark', 'text-light');
        carritoBody.classList.remove('bg-dark','box-light','text-light')
        carritoFooter.classList.remove('bg-secondary');
        carritoFooterText.classList.remove('text-light');
        listaCardBody.forEach(card=>card.classList.remove('box-light'));
        footerHeader.classList.remove('bg-secondary','bg-opacity-10')
        footerMain.classList.remove('bg-secondary','bg-opacity-50');
    }
}

function estiloModal(){
    let modalContent = document.querySelector('.modal-content')
    let modalDescripcion = document.querySelector('.descripcion-producto');

    if(modoOscuro){
        modalContent.classList.add('bg-dark');
        modalContent.classList.add('box-light');
        modalDescripcion.classList.add('text-light');
    }
    else{
        modalContent.classList.remove('bg-dark');
        modalContent.classList.remove('box-light');
        modalDescripcion.classList.remove('text-light');
    }
}