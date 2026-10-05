// ==========================================
// OBTENER PEDIDOS
// ==========================================

function obtenerPedidos() {

    return JSON.parse(
        localStorage.getItem("malhaberPedidos")
    ) || [];

}


// ==========================================
// GUARDAR PEDIDOS
// ==========================================

function guardarPedidos(pedidos) {

    localStorage.setItem(
        "malhaberPedidos",
        JSON.stringify(pedidos)
    );

}


// ==========================================
// ACTUALIZAR PANEL
// ==========================================

function actualizarPedidos() {

    const pedidos = obtenerPedidos();

    const lista =
        document.getElementById(
            "lista-pedidos"
        );

    lista.innerHTML = "";


    if (pedidos.length === 0) {

        lista.innerHTML = `
            <p class="sin-pedidos">
                Todavía no hay pedidos.
            </p>
        `;

        actualizarContadores(pedidos);

        return;
    }


    [...pedidos]
        .reverse()
        .forEach(
            pedido => {

                crearTarjetaPedido(
                    pedido,
                    lista
                );

            }
        );


    actualizarContadores(
        pedidos
    );

}


// ==========================================
// CREAR TARJETA
// ==========================================

function crearTarjetaPedido(
    pedido,
    lista
) {

    let claseEstado =
        "estado-pendiente";


    if (
        pedido.estado ===
        "CONFIRMADO"
    ) {

        claseEstado =
            "estado-confirmado";

    }


    if (
        pedido.estado ===
        "RECHAZADO"
    ) {

        claseEstado =
            "estado-rechazado";

    }


    let productosHTML = "";


    pedido.productos.forEach(
        producto => {

            const subtotal =
                producto.precio
                *
                producto.cantidad;


            productosHTML += `
                <div class="producto-linea">

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


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "pedido-card";


    card.innerHTML = `

        <div class="pedido-cabecera">

            <div>

                <div class="codigo">
                    ${pedido.codigo}
                </div>

                <h3>
                    ${pedido.cliente}
                </h3>

            </div>


            <span class="estado ${claseEstado}">
                ${pedido.estado}
            </span>

        </div>


        <div class="datos">

            <p>
                <strong>
                    Celular:
                </strong>

                ${pedido.celular}
            </p>


            <p>
                <strong>
                    Pago:
                </strong>

                ${pedido.metodoPago}
            </p>


            <p>
                <strong>
                    Modalidad:
                </strong>

                ${pedido.tipoPedido}
            </p>


            <p>
                <strong>
                    Fecha:
                </strong>

                ${pedido.fecha}
            </p>


            ${
                pedido.tipoPedido ===
                "Delivery"

                ?

                `
                <p>
                    <strong>
                        Dirección:
                    </strong>

                    ${pedido.direccion}
                </p>
                `

                :

                ""
            }

        </div>


        <div class="productos-pedido">

            ${productosHTML}

        </div>


        <div class="total">

            <span>
                Total
            </span>

            <strong>
                S/
                ${pedido.total.toFixed(2)}
            </strong>

        </div>


        ${generarControlesPedido(pedido)}

    `;


    lista.appendChild(
        card
    );

}


// ==========================================
// CONTROLES SEGÚN ESTADO
// ==========================================

function generarControlesPedido(
    pedido
) {

    // PENDIENTE

    if (
        pedido.estado ===
        "PENDIENTE"
    ) {

        return `

            <div class="acciones">

                <button
                    class="confirmar"
                    onclick="cambiarEstadoPago(
                        '${pedido.codigo}',
                        'CONFIRMADO'
                    )">

                    ✓ Confirmar pedido

                </button>


                <button
                    class="rechazar"
                    onclick="cambiarEstadoPago(
                        '${pedido.codigo}',
                        'RECHAZADO'
                    )">

                    ✕ Rechazar pedido

                </button>

            </div>

        `;

    }


    // RECHAZADO

    if (
        pedido.estado ===
        "RECHAZADO"
    ) {

        return `

            <div class="pedido-rechazado-box">

                ❌ Pedido rechazado

            </div>

        `;

    }


    // CONFIRMADO

    const tiempoActual =
        pedido.tiempoEstimado || "";


    const estadoPedido =
        pedido.estadoPedido
        ||
        "CONFIRMADO";


    let botonesEstado = "";


    if (
        pedido.tipoPedido ===
        "Delivery"
    ) {

        botonesEstado = `

            <button
                class="btn-preparando"
                onclick="actualizarEstadoPedido(
                    '${pedido.codigo}',
                    'PREPARANDO'
                )">

                🍳 Preparando

            </button>


            <button
                class="btn-camino"
                onclick="actualizarEstadoPedido(
                    '${pedido.codigo}',
                    'EN CAMINO'
                )">

                🛵 En camino

            </button>


            <button
                class="btn-entregado"
                onclick="actualizarEstadoPedido(
                    '${pedido.codigo}',
                    'ENTREGADO'
                )">

                ✓ Entregado

            </button>

        `;

    } else {

        botonesEstado = `

            <button
                class="btn-preparando"
                onclick="actualizarEstadoPedido(
                    '${pedido.codigo}',
                    'PREPARANDO'
                )">

                🍳 Preparando

            </button>


            <button
                class="btn-listo"
                onclick="actualizarEstadoPedido(
                    '${pedido.codigo}',
                    'LISTO'
                )">

                🥡 Listo para recoger

            </button>

        `;

    }


    return `

        <div class="gestion-pedido">

            <div class="gestion-titulo">

                <div>

                    <span>
                        CONTROL DEL PEDIDO
                    </span>

                    <h4>
                        Gestionar preparación
                    </h4>

                </div>


                <div class="estado-cocina">

                    ${estadoPedido}

                </div>

            </div>


            <div class="tiempo-admin">

                <label>
                    Tiempo aproximado
                </label>


                <div class="botones-tiempo">

                    <button
                        class="${
                            tiempoActual ===
                            "20 minutos"
                            ?
                            "seleccionado"
                            :
                            ""
                        }"

                        onclick="establecerTiempo(
                            '${pedido.codigo}',
                            '20 minutos'
                        )">

                        20 min

                    </button>


                    <button
                        class="${
                            tiempoActual ===
                            "25 minutos"
                            ?
                            "seleccionado"
                            :
                            ""
                        }"

                        onclick="establecerTiempo(
                            '${pedido.codigo}',
                            '25 minutos'
                        )">

                        25 min

                    </button>


                    <button
                        class="${
                            tiempoActual ===
                            "35 minutos"
                            ?
                            "seleccionado"
                            :
                            ""
                        }"

                        onclick="establecerTiempo(
                            '${pedido.codigo}',
                            '35 minutos'
                        )">

                        35 min

                    </button>

                </div>


                ${
                    tiempoActual

                    ?

                    `
                    <p class="tiempo-seleccionado">

                        Tiempo informado:
                        <strong>
                            ${tiempoActual}
                        </strong>

                    </p>
                    `

                    :

                    `
                    <p class="tiempo-faltante">

                        ⚠ Selecciona el tiempo aproximado.

                    </p>
                    `
                }

            </div>


            <div class="estados-admin">

                <label>
                    Actualizar estado
                </label>

                <div class="botones-estado">

                    ${botonesEstado}

                </div>

            </div>


            <div class="whatsapp-admin">

                <button
                    onclick="avisarWhatsApp(
                        '${pedido.codigo}'
                    )">

                    💬 Avisar por WhatsApp

                </button>

            </div>

        </div>

    `;

}


// ==========================================
// CONFIRMAR / RECHAZAR
// ==========================================

function cambiarEstadoPago(
    codigo,
    nuevoEstado
) {

    const pedidos =
        obtenerPedidos();


    const pedido =
        pedidos.find(
            pedido =>
                pedido.codigo ===
                codigo
        );


    if (!pedido) {
        return;
    }


    if (
        nuevoEstado ===
        "CONFIRMADO"
    ) {

        const respuesta =
            confirm(
                "¿Confirmas que este pedido y su pago son correctos?"
            );


        if (!respuesta) {
            return;
        }


        pedido.estado =
            "CONFIRMADO";


        pedido.estadoPedido =
            "CONFIRMADO";


    } else {

        const respuesta =
            confirm(
                "¿Seguro que deseas rechazar este pedido?"
            );


        if (!respuesta) {
            return;
        }


        pedido.estado =
            "RECHAZADO";


        pedido.estadoPedido =
            "RECHAZADO";

    }


    guardarPedidos(
        pedidos
    );


    actualizarPedidos();

}


// ==========================================
// TIEMPO ESTIMADO
// ==========================================

function establecerTiempo(
    codigo,
    tiempo
) {

    const pedidos =
        obtenerPedidos();


    const pedido =
        pedidos.find(
            pedido =>
                pedido.codigo ===
                codigo
        );


    if (!pedido) {
        return;
    }


    pedido.tiempoEstimado =
        tiempo;


    guardarPedidos(
        pedidos
    );


    actualizarPedidos();

}


// ==========================================
// CAMBIAR ESTADO DEL PEDIDO
// ==========================================

function actualizarEstadoPedido(
    codigo,
    nuevoEstado
) {

    const pedidos =
        obtenerPedidos();


    const pedido =
        pedidos.find(
            pedido =>
                pedido.codigo ===
                codigo
        );


    if (!pedido) {
        return;
    }


    if (
        !pedido.tiempoEstimado
        &&
        nuevoEstado ===
        "PREPARANDO"
    ) {

        alert(
            "Primero selecciona un tiempo aproximado: 20, 25 o 35 minutos."
        );

        return;

    }


    pedido.estadoPedido =
        nuevoEstado;


    guardarPedidos(
        pedidos
    );


    actualizarPedidos();


    let mensaje = "";


    if (
        nuevoEstado ===
        "PREPARANDO"
    ) {

        mensaje =
            "El pedido ahora está en preparación.";

    }


    if (
        nuevoEstado ===
        "EN CAMINO"
    ) {

        mensaje =
            "El pedido ahora está en camino.";

    }


    if (
        nuevoEstado ===
        "LISTO"
    ) {

        mensaje =
            "El pedido está listo para recoger.";

    }


    if (
        nuevoEstado ===
        "ENTREGADO"
    ) {

        mensaje =
            "El pedido fue marcado como entregado.";

    }


    alert(mensaje);

}


// ==========================================
// WHATSAPP
// ==========================================

function avisarWhatsApp(
    codigo
) {

    const pedidos =
        obtenerPedidos();


    const pedido =
        pedidos.find(
            pedido =>
                pedido.codigo ===
                codigo
        );


    if (!pedido) {
        return;
    }


    let numero =
        pedido.celular
            .replace(
                /\D/g,
                ""
            );


    // AGREGAR CÓDIGO DE PERÚ

    if (
        numero.length === 9
    ) {

        numero =
            "51"
            +
            numero;

    }


    let mensaje = "";


    // DELIVERY

    if (
        pedido.tipoPedido ===
        "Delivery"
    ) {

        if (
            pedido.estadoPedido ===
            "PREPARANDO"
        ) {

            mensaje =
`Hola ${pedido.cliente} 👋

Somos MALHABER BURGER 🍔.

Tu pedido ${pedido.codigo} ya está siendo preparado.

⏱ Tiempo aproximado: ${pedido.tiempoEstimado || "por confirmar"}.

Te avisaremos cuando salga para entrega.

¡Gracias por tu compra! 🔥`;

        }


        else if (
            pedido.estadoPedido ===
            "EN CAMINO"
        ) {

            mensaje =
`Hola ${pedido.cliente} 👋

Somos MALHABER BURGER 🍔.

🛵 ¡Tu pedido ${pedido.codigo} ya está en camino!

Por favor mantente atento/a para recibirlo.

Dirección:
${pedido.direccion}

¡Gracias por elegirnos! 🔥`;

        }


        else if (
            pedido.estadoPedido ===
            "ENTREGADO"
        ) {

            mensaje =
`Hola ${pedido.cliente} 👋

Tu pedido ${pedido.codigo} fue marcado como entregado ✅.

Esperamos que disfrutes tu pedido.

¡Gracias por elegir MALHABER BURGER! 🍔🔥`;

        }


        else {

            mensaje =
`Hola ${pedido.cliente} 👋

Somos MALHABER BURGER 🍔.

Tu pedido ${pedido.codigo} fue confirmado.

En breve comenzaremos a prepararlo.

Tiempo estimado:
${pedido.tiempoEstimado || "por confirmar"}.`;

        }

    }


    // RECOJO

    else {

        if (
            pedido.estadoPedido ===
            "PREPARANDO"
        ) {

            mensaje =
`Hola ${pedido.cliente} 👋

Somos MALHABER BURGER 🍔.

Tu pedido ${pedido.codigo} ya se está preparando.

⏱ Tiempo aproximado:
${pedido.tiempoEstimado || "por confirmar"}.

Te avisaremos cuando esté listo para recoger.`;

        }


        else if (
            pedido.estadoPedido ===
            "LISTO"
        ) {

            mensaje =
`Hola ${pedido.cliente} 👋

🥡 ¡Tu pedido ${pedido.codigo} ya está listo!

Puedes acercarte a MALHABER BURGER para recogerlo.

Te esperamos 🍔🔥`;

        }


        else {

            mensaje =
`Hola ${pedido.cliente} 👋

Somos MALHABER BURGER 🍔.

Tu pedido ${pedido.codigo} fue confirmado.

Tiempo aproximado:
${pedido.tiempoEstimado || "por confirmar"}.

Te avisaremos cuando esté listo para recoger.`;

        }

    }


    const enlace =
        "https://wa.me/"
        +
        numero
        +
        "?text="
        +
        encodeURIComponent(
            mensaje
        );


    window.open(
        enlace,
        "_blank"
    );

}


// ==========================================
// CONTADORES
// ==========================================

function actualizarContadores(
    pedidos
) {

    const pendientes =
        pedidos.filter(
            pedido =>
                pedido.estado ===
                "PENDIENTE"
        ).length;


    const confirmados =
        pedidos.filter(
            pedido =>
                pedido.estado ===
                "CONFIRMADO"
        ).length;


    const rechazados =
        pedidos.filter(
            pedido =>
                pedido.estado ===
                "RECHAZADO"
        ).length;


    document
        .getElementById(
            "contador-pendientes"
        )
        .textContent =
        pendientes;


    document
        .getElementById(
            "contador-confirmados"
        )
        .textContent =
        confirmados;


    document
        .getElementById(
            "contador-rechazados"
        )
        .textContent =
        rechazados;

}


// ==========================================
// ACTUALIZACIÓN AUTOMÁTICA
// ==========================================

window.addEventListener(
    "storage",
    actualizarPedidos
);


setInterval(
    actualizarPedidos,
    1500
);


actualizarPedidos();