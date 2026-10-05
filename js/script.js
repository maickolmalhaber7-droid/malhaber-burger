let carrito = [];

let pedidoActualCodigo = null;

let timerNotificacion;

let verificacionTerminada = false;


// ======================================================
// CARRITO
// ======================================================

function agregarProducto(nombre, precio) {

    const existente =
        carrito.find(
            producto =>
                producto.nombre === nombre
        );


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            nombre: nombre,

            precio: precio,

            cantidad: 1

        });

    }


    actualizarPagina();


    mostrarNotificacion(
        nombre + " agregado al carrito"
    );

}



function aumentarProducto(nombre) {

    const producto =
        carrito.find(
            producto =>
                producto.nombre === nombre
        );


    if (producto) {

        producto.cantidad++;

    }


    actualizarPagina();

}



function disminuirProducto(nombre) {

    const producto =
        carrito.find(
            producto =>
                producto.nombre === nombre
        );


    if (!producto) {
        return;
    }


    producto.cantidad--;


    if (producto.cantidad <= 0) {

        eliminarProducto(nombre);

        return;

    }


    actualizarPagina();

}



function eliminarProducto(nombre) {

    carrito =
        carrito.filter(
            producto =>
                producto.nombre !== nombre
        );


    actualizarPagina();

}



// ======================================================
// TOTAL
// ======================================================

function calcularTotal() {

    return carrito.reduce(

        (
            total,
            producto
        ) =>

        total
        +
        producto.precio
        *
        producto.cantidad,

        0

    );

}



function calcularCantidad() {

    return carrito.reduce(

        (
            total,
            producto
        ) =>

        total
        +
        producto.cantidad,

        0

    );

}



// ======================================================
// ACTUALIZAR PÁGINA
// ======================================================

function actualizarPagina() {

    const contador =
        document.getElementById(
            "contador-carrito"
        );


    if (contador) {

        contador.textContent =
            calcularCantidad();

    }


    renderizarCarrito();

    renderizarResumen();

}



// ======================================================
// MOSTRAR CARRITO
// ======================================================

function renderizarCarrito() {

    const contenedor =
        document.getElementById(
            "productos-carrito"
        );


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = "";


    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <p class="mensaje-vacio">
                Tu carrito está vacío.
            </p>

        `;

    }


    carrito.forEach(
        producto => {

            const subtotal =
                producto.precio
                *
                producto.cantidad;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "item-carrito";


            item.innerHTML = `

                <div class="item-carrito-info">

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <p>
                        S/ ${producto.precio.toFixed(2)}
                        por unidad
                    </p>

                    <div class="item-carrito-subtotal">

                        Subtotal:
                        S/ ${subtotal.toFixed(2)}

                    </div>

                </div>


                <div class="controles">

                    <button
                        onclick="disminuirProducto('${producto.nombre}')">

                        −

                    </button>


                    <strong>
                        ${producto.cantidad}
                    </strong>


                    <button
                        onclick="aumentarProducto('${producto.nombre}')">

                        +

                    </button>


                    <button
                        class="eliminar"
                        onclick="eliminarProducto('${producto.nombre}')">

                        🗑

                    </button>

                </div>

            `;


            contenedor.appendChild(
                item
            );

        }
    );


    const totalCarrito =
        document.getElementById(
            "total-carrito"
        );


    if (totalCarrito) {

        totalCarrito.textContent =
            "S/ "
            +
            calcularTotal().toFixed(2);

    }

}



// ======================================================
// RESUMEN
// ======================================================

function renderizarResumen() {

    const resumen =
        document.getElementById(
            "resumen-pedido"
        );


    if (!resumen) {
        return;
    }


    resumen.innerHTML = "";


    if (carrito.length === 0) {

        resumen.innerHTML = `

            <p class="mensaje-vacio">
                Todavía no agregaste productos.
            </p>

        `;

    }


    carrito.forEach(
        producto => {

            const subtotal =
                producto.precio
                *
                producto.cantidad;


            resumen.innerHTML += `

                <div class="item-resumen">

                    <span>

                        ${producto.cantidad}
                        ×
                        ${producto.nombre}

                    </span>


                    <strong>

                        S/
                        ${subtotal.toFixed(2)}

                    </strong>

                </div>

            `;

        }
    );


    const totalResumen =
        document.getElementById(
            "total-resumen"
        );


    if (totalResumen) {

        totalResumen.textContent =
            "S/ "
            +
            calcularTotal().toFixed(2);

    }

}



// ======================================================
// CARRITO MODAL
// ======================================================

function abrirCarrito() {

    document
        .getElementById(
            "modal-carrito"
        )
        .classList
        .add(
            "activo"
        );

}



function cerrarCarrito() {

    document
        .getElementById(
            "modal-carrito"
        )
        .classList
        .remove(
            "activo"
        );

}



function irFinalizarPedido() {

    cerrarCarrito();


    document
        .getElementById(
            "pedido"
        )
        .scrollIntoView({

            behavior:
                "smooth"

        });

}



// ======================================================
// DELIVERY / RECOJO
// ======================================================

function cambiarTipoPedido() {

    const tipo =
        document
            .getElementById(
                "tipoPedido"
            )
            .value;


    const direccion =
        document
            .getElementById(
                "contenedor-direccion"
            );


    if (tipo === "Delivery") {

        direccion
            .classList
            .remove(
                "oculto"
            );

    } else {

        direccion
            .classList
            .add(
                "oculto"
            );

    }

}



// ======================================================
// VALIDAR DATOS
// ======================================================

function validarPedido() {

    if (carrito.length === 0) {

        alert(
            "Primero agrega productos al carrito."
        );

        return false;

    }


    const nombre =
        document
            .getElementById(
                "nombre"
            )
            .value
            .trim();


    const celular =
        document
            .getElementById(
                "celular"
            )
            .value
            .trim();


    if (nombre === "") {

        alert(
            "Ingresa tu nombre."
        );

        return false;

    }


    if (celular === "") {

        alert(
            "Ingresa tu número de celular."
        );

        return false;

    }


    const tipo =
        document
            .getElementById(
                "tipoPedido"
            )
            .value;


    if (tipo === "Delivery") {

        const direccion =
            document
                .getElementById(
                    "direccion"
                )
                .value
                .trim();


        if (direccion === "") {

            alert(
                "Ingresa la dirección del delivery."
            );

            return false;

        }

    }


    return true;

}



// ======================================================
// FINALIZAR PEDIDO
// ======================================================

function finalizarPedido() {

    if (!validarPedido()) {
        return;
    }


    const metodo =
        document
            .getElementById(
                "metodoPago"
            )
            .value;


    if (metodo === "Yape") {

        abrirYape();

    } else {

        crearPedidoEfectivo();

    }

}



// ======================================================
// YAPE
// ======================================================

function abrirYape() {

    document
        .getElementById(
            "monto-yape"
        )
        .textContent =

        "S/ "
        +
        calcularTotal().toFixed(2);


    document
        .getElementById(
            "modal-yape"
        )
        .classList
        .add(
            "activo"
        );

}



function cerrarYape() {

    document
        .getElementById(
            "modal-yape"
        )
        .classList
        .remove(
            "activo"
        );

}



// ======================================================
// LOCAL STORAGE
// ======================================================

function obtenerPedidos() {

    return JSON.parse(

        localStorage.getItem(
            "malhaberPedidos"
        )

    ) || [];

}



function guardarPedidos(pedidos) {

    localStorage.setItem(

        "malhaberPedidos",

        JSON.stringify(
            pedidos
        )

    );

}



// ======================================================
// CREAR PEDIDO YAPE
// ======================================================

function enviarPagoVerificacion() {

    if (!validarPedido()) {
        return;
    }


    const nombre =
        document
            .getElementById(
                "nombre"
            )
            .value
            .trim();


    const celular =
        document
            .getElementById(
                "celular"
            )
            .value
            .trim();


    const tipoPedido =
        document
            .getElementById(
                "tipoPedido"
            )
            .value;


    const direccion =
        document
            .getElementById(
                "direccion"
            )
            .value
            .trim();


    const codigo =
        "MB-" +
        Math.floor(

            10000
            +
            Math.random()
            *
            90000

        );


    const pedido = {

        codigo:
            codigo,

        cliente:
            nombre,

        celular:
            celular,

        tipoPedido:
            tipoPedido,

        direccion:

            tipoPedido === "Delivery"

            ?

            direccion

            :

            "",

        metodoPago:
            "Yape",

        productos:

            carrito.map(
                producto => ({
                    ...producto
                })
            ),

        total:
            calcularTotal(),

        estado:
            "PENDIENTE",

        estadoPedido:
            "ESPERANDO CONFIRMACIÓN",

        tiempoEstimado:
            "",

        fecha:

            new Date()
                .toLocaleString(
                    "es-PE"
                )

    };


    const pedidos =
        obtenerPedidos();


    pedidos.push(
        pedido
    );


    guardarPedidos(
        pedidos
    );


    pedidoActualCodigo =
        codigo;


    verificacionTerminada =
        false;


    // GUARDAMOS EL PEDIDO QUE ESTÁ ESPERANDO

    localStorage.setItem(

        "malhaberPedidoPendiente",

        codigo

    );


    cerrarYape();


    prepararModalVerificacion();


    document
        .getElementById(
            "modal-verificacion"
        )
        .classList
        .add(
            "activo"
        );

}



// ======================================================
// EFECTIVO
// ======================================================

function crearPedidoEfectivo() {

    if (!validarPedido()) {
        return;
    }


    const codigo =
        "MB-" +
        Math.floor(

            10000
            +
            Math.random()
            *
            90000

        );


    const tipoPedido =
        document
            .getElementById(
                "tipoPedido"
            )
            .value;


    const pedido = {

        codigo:
            codigo,

        cliente:

            document
                .getElementById(
                    "nombre"
                )
                .value
                .trim(),

        celular:

            document
                .getElementById(
                    "celular"
                )
                .value
                .trim(),

        tipoPedido:
            tipoPedido,

        direccion:

            tipoPedido === "Delivery"

            ?

            document
                .getElementById(
                    "direccion"
                )
                .value
                .trim()

            :

            "",

        metodoPago:
            "Efectivo",

        productos:

            carrito.map(
                producto => ({
                    ...producto
                })
            ),

        total:
            calcularTotal(),

        estado:
            "PENDIENTE",

        estadoPedido:
            "ESPERANDO CONFIRMACIÓN",

        tiempoEstimado:
            "",

        fecha:

            new Date()
                .toLocaleString(
                    "es-PE"
                )

    };


    const pedidos =
        obtenerPedidos();


    pedidos.push(
        pedido
    );


    guardarPedidos(
        pedidos
    );


    pedidoActualCodigo =
        codigo;


    verificacionTerminada =
        false;


    localStorage.setItem(

        "malhaberPedidoPendiente",

        codigo

    );


    prepararModalVerificacion();


    document
        .getElementById(
            "modal-verificacion"
        )
        .classList
        .add(
            "activo"
        );

}



// ======================================================
// PREPARAR PANTALLA DE ESPERA
// ======================================================

function prepararModalVerificacion() {

    const icono =
        document.getElementById(
            "icono-verificacion"
        );


    const titulo =
        document.getElementById(
            "titulo-verificacion"
        );


    const mensaje =
        document.getElementById(
            "mensaje-verificacion"
        );


    const loader =
        document.getElementById(
            "loader-verificacion"
        );


    const codigo =
        document.getElementById(
            "codigo-cliente"
        );


    const boton =
        document.getElementById(
            "btn-ver-mi-pedido"
        );


    icono.textContent =
        "⏳";


    titulo.textContent =
        "Pedido enviado para verificación";


    titulo.classList.remove(
        "estado-confirmado",
        "estado-rechazado"
    );


    mensaje.textContent =
        "Estamos revisando tu pedido. Por favor espera mientras el vendedor lo confirma.";


    loader.style.display =
        "flex";


    codigo.textContent =
        pedidoActualCodigo;


    if (boton) {

        boton
            .classList
            .add(
                "oculto"
            );

    }

}



// ======================================================
// REVISAR CONFIRMACIÓN DEL ADMIN
// ======================================================

function revisarEstadoPedido() {

    /*
        Si la página se recargó,
        recuperamos el pedido pendiente.
    */

    if (!pedidoActualCodigo) {

        pedidoActualCodigo =
            localStorage.getItem(
                "malhaberPedidoPendiente"
            );

    }


    if (!pedidoActualCodigo) {
        return;
    }


    const pedidos =
        obtenerPedidos();


    const pedido =
        pedidos.find(
            item =>
                item.codigo ===
                pedidoActualCodigo
        );


    if (!pedido) {
        return;
    }



    // ======================================
    // CONFIRMADO
    // ======================================

    if (
        pedido.estado ===
        "CONFIRMADO"
        &&
        !verificacionTerminada
    ) {

        verificacionTerminada =
            true;


        /*
            AQUÍ GUARDAMOS EL PEDIDO
            QUE SE MOSTRARÁ EN
            mi-pedido.html
        */

        localStorage.setItem(

            "malhaberPedidoCliente",

            pedido.codigo

        );


        localStorage.removeItem(
            "malhaberPedidoPendiente"
        );


        // MOSTRAR MI PEDIDO EN EL MENÚ

        const menuMiPedido =
            document.getElementById(
                "menu-mi-pedido"
            );


        if (menuMiPedido) {

            menuMiPedido
                .classList
                .remove(
                    "oculto"
                );

        }


        // CAMBIAR ICONO

        document
            .getElementById(
                "icono-verificacion"
            )
            .textContent =
            "✅";


        // CAMBIAR TÍTULO

        const titulo =
            document.getElementById(
                "titulo-verificacion"
            );


        titulo.textContent =
            "¡Pedido confirmado!";


        titulo
            .classList
            .remove(
                "estado-rechazado"
            );


        titulo
            .classList
            .add(
                "estado-confirmado"
            );


        // MENSAJE

        document
            .getElementById(
                "mensaje-verificacion"
            )
            .textContent =
            "Tu pedido fue confirmado correctamente. Ya puedes revisar su preparación y seguimiento.";


        // OCULTAR PUNTITOS

        document
            .getElementById(
                "loader-verificacion"
            )
            .style
            .display =
            "none";


        // MOSTRAR BOTÓN

        const boton =
            document.getElementById(
                "btn-ver-mi-pedido"
            );


        if (boton) {

            boton
                .classList
                .remove(
                    "oculto"
                );

        }


        return;

    }



    // ======================================
    // RECHAZADO
    // ======================================

    if (
        pedido.estado ===
        "RECHAZADO"
        &&
        !verificacionTerminada
    ) {

        verificacionTerminada =
            true;


        localStorage.removeItem(
            "malhaberPedidoPendiente"
        );


        document
            .getElementById(
                "icono-verificacion"
            )
            .textContent =
            "❌";


        const titulo =
            document.getElementById(
                "titulo-verificacion"
            );


        titulo.textContent =
            "Pedido no confirmado";


        titulo
            .classList
            .remove(
                "estado-confirmado"
            );


        titulo
            .classList
            .add(
                "estado-rechazado"
            );


        document
            .getElementById(
                "mensaje-verificacion"
            )
            .textContent =
            "No pudimos confirmar tu pedido. Revisa tu información o comunícate con MALHABER BURGER.";


        document
            .getElementById(
                "loader-verificacion"
            )
            .style
            .display =
            "none";

    }

}



// ======================================================
// RESTAURAR MI PEDIDO AL RECARGAR
// ======================================================

function restaurarPedidoCliente() {

    const codigo =
        localStorage.getItem(
            "malhaberPedidoCliente"
        );


    if (!codigo) {
        return;
    }


    const pedidos =
        obtenerPedidos();


    const pedido =
        pedidos.find(
            item =>
                item.codigo === codigo
        );


    if (
        !pedido
        ||
        pedido.estado !==
        "CONFIRMADO"
    ) {

        return;

    }


    const menu =
        document.getElementById(
            "menu-mi-pedido"
        );


    if (menu) {

        menu
            .classList
            .remove(
                "oculto"
            );

    }

}



// ======================================================
// TICKET
// ======================================================

function generarTicket(pedido) {

    if (!pedido) {
        return;
    }


    let productosHTML =
        "";


    pedido.productos.forEach(
        producto => {

            const subtotal =
                producto.precio
                *
                producto.cantidad;


            productosHTML += `

                <div class="ticket-producto">

                    <span>

                        ${producto.cantidad}
                        x
                        ${producto.nombre}

                    </span>

                    <span>

                        S/
                        ${subtotal.toFixed(2)}

                    </span>

                </div>

            `;

        }
    );


    const contenido =
        document.getElementById(
            "contenido-ticket"
        );


    contenido.innerHTML = `

        <div class="ticket-centro">

            <h2>
                MALHABER BURGER
            </h2>

            <p>
                COMPROBANTE DE PEDIDO
            </p>

        </div>


        <div class="ticket-linea"></div>


        <p>
            Pedido:
            ${pedido.codigo}
        </p>

        <p>
            Fecha:
            ${pedido.fecha}
        </p>

        <p>
            Cliente:
            ${pedido.cliente}
        </p>

        <p>
            Celular:
            ${pedido.celular}
        </p>

        <p>
            Modalidad:
            ${pedido.tipoPedido}
        </p>

        <p>
            Pago:
            ${pedido.metodoPago}
        </p>


        <div class="ticket-linea"></div>


        ${productosHTML}


        <div class="ticket-linea"></div>


        <div class="ticket-total">

            <span>
                TOTAL
            </span>

            <span>

                S/
                ${pedido.total.toFixed(2)}

            </span>

        </div>


        <div class="ticket-linea"></div>


        <p class="ticket-centro">

            ¡Gracias por tu compra!

        </p>

    `;


    document
        .getElementById(
            "modal-ticket"
        )
        .classList
        .add(
            "activo"
        );

}



function cerrarTicket() {

    document
        .getElementById(
            "modal-ticket"
        )
        .classList
        .remove(
            "activo"
        );

}



// ======================================================
// NUEVO PEDIDO
// ======================================================

function nuevoPedido() {

    carrito = [];


    pedidoActualCodigo =
        null;


    verificacionTerminada =
        false;


    document
        .getElementById(
            "nombre"
        )
        .value =
        "";


    document
        .getElementById(
            "celular"
        )
        .value =
        "";


    document
        .getElementById(
            "direccion"
        )
        .value =
        "";


    document
        .getElementById(
            "tipoPedido"
        )
        .value =
        "Recojo";


    document
        .getElementById(
            "metodoPago"
        )
        .value =
        "Yape";


    document
        .getElementById(
            "contenedor-direccion"
        )
        .classList
        .add(
            "oculto"
        );


    actualizarPagina();


    cerrarTicket();

}



// ======================================================
// NOTIFICACIÓN
// ======================================================

function mostrarNotificacion(
    mensaje
) {

    const notificacion =
        document.getElementById(
            "notificacion"
        );


    if (!notificacion) {
        return;
    }


    notificacion.textContent =
        "✓ "
        +
        mensaje;


    notificacion
        .classList
        .add(
            "visible"
        );


    clearTimeout(
        timerNotificacion
    );


    timerNotificacion =
        setTimeout(
            () => {

                notificacion
                    .classList
                    .remove(
                        "visible"
                    );

            },

            1800
        );

}



// ======================================================
// CAMBIOS ENTRE PESTAÑAS
// ======================================================

window.addEventListener(
    "storage",
    function () {

        revisarEstadoPedido();

        restaurarPedidoCliente();

    }
);



// ======================================================
// REVISIÓN AUTOMÁTICA
// ======================================================

setInterval(
    function () {

        revisarEstadoPedido();

    },

    1000
);



// ======================================================
// INICIAR
// ======================================================

actualizarPagina();

restaurarPedidoCliente();

revisarEstadoPedido();