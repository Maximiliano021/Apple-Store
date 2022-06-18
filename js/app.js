const carrito = [];
function randomId() {
    return Math.random().toString(36).substr(2, 9);
};

class Producto {
    constructor(nombre, precio, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
    }
}
class ProductoACarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

const MacBook = new Producto('MacBook Pro', 25000, randomId())
const Iphone14 = new Producto('Iphone 14', 5000, randomId())
const Ipad = new Producto('Ipad Pro', 21000, randomId())
const productos = [MacBook, Iphone14, Ipad];


function programa() {
    let opcion = prompt(`1- COMPRAR\n2- CARRITO\n3- SALIR`)
    while ((opcion >= 1 && opcion <= 2)) {
        switch (opcion) {
            case '1': agregarCarrito(); break;
            case '2': mostrarCarrito(); break;
            default: break;
        }
        opcion = prompt(`1- COMPRAR\n2- CARRITO\n3- SALIR`)
    }
    alert('HASTA LUEGO')
}

function agregarCarrito() {
    let productoElegido = mostrarProductos() - 1;
    console.log(productoElegido)
    buscarProducto(productos[productoElegido]);
}
function mostrarProductos() {
    let menuCompra = `        PRODUCTO          PRECIO    \n`;
    let cantidad = 1;
    productos.forEach(producto => {
        menuCompra += cantidad++ + '-    ' + producto.nombre + '          ' + '$' + producto.precio + '\n';
    })
    menuCompra += '\nQue desea Comprar?'
    let producto = prompt(menuCompra);
    while (!(producto >= 1 && producto <= cantidad)) {
        producto = prompt(menuCompra);
    }
    return producto;
}
function buscarProducto(productoElegido) {
    productos.find(producto => producto.id == productoElegido.id)
    if (productos === undefined)
        alert('No encontre nada')
    else {
        let cantidad = prompt('Cuantos desea comprar? ')
        let producto1 = new ProductoACarrito(productoElegido, cantidad)
        carrito.push(producto1)
        alert('PRODUCTO AGREGADO A CARRITO')
    }

}

function mostrarCarrito() {
    let mensaje = '';
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        mensaje += '* ' + carrito[i].producto.nombre + '     $' + carrito[i].producto.precio + '         Cantidad:' + carrito[i].cantidad + '\n';
        total += carrito[i].cantidad * carrito[i].producto.precio;
    }
    alert(mensaje + '\n' + 'TOTAL:  $' + total);

}

programa();