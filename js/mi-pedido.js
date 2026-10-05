// ==========================================
// OBTENER TODOS LOS PEDIDOS
// ==========================================

function obtenerPedidos() {

    return JSON.parse(
        localStorage.getItem(
            "malhaberPedidos"
        )
    ) || [];

}


// ==========================================
// OBTENER EL PEDIDO DEL CLIENTE
// ==========================================

function obtenerPedidoActual() {

    const codigo =
        localStorage.getItem(
            "malhaberPedidoCliente"
        );


    if (!codigo) {

        return null;

    }


    const pedidos =
        obtenerPedidos();


    return pedidos.find(
        pedido =>
            pedido.codigo === codigo
    ) || null;

}


// ==========================================
// RENDERIZAR PEDIDO
// ==========================================

function renderizarPedido() {

    const contenedor =
        document.getElementById(
            "contenedor-pedido"
        );


    const pedido =
        obtenerPedidoActual();


    // SI NO HAY PEDIDO CONFIRMADO

    if (
        !pedido
        ||
        pedido.estado !==
        "CONFIRMADO"
    ) {

        contenedor.innerHTML = `

            <div class="sin-pedido">

                <span>
                    🍔
                </span>

                <h2>
                    No tienes un pedido activo
                </h2>

                <p>

                    Cuando MALHABER BURGER
                    confirme tu pedido,
                    podrás consultar aquí
                    su preparación
                    y seguimiento.

                </p>

                <a href="index.html">
                    Ir al menú
                </a>

            </div>

        `;


        return;

    }


    const estado =
        pedido.estadoPedido
        ||
        "CONFIRMADO";


    const tiempo =
        pedido.tiempoEstimado
        ||
        "Por confirmar";


    let pasosHTML = "";

    let mensaje = "";


    // ======================================
    // DELIVERY
    // ======================================

    if (
        pedido.tipoPedido ===
        "Delivery"
    ) {

        const preparando =
            [
                "PREPARANDO",
                "EN CAMINO",
                "ENTREGADO"
            ].includes(
                estado
            );


        const enCamino =
            [
                "EN CAMINO",
                "ENTREGADO"
            ].includes(
                estado
            );


        const entregado =
            estado ===
            "ENTREGADO";


        pasosHTML = `

            <div class="paso completado">

                <div class="paso-icono">
                    ✓
                </div>

                <div class="paso-texto">

                    <h4>
                        Pedido confirmado
                    </h4>

                    <p>

                        MALHABER BURGER
                        aceptó tu pedido
                        correctamente.

                    </p>

                </div>

            </div>


            <div class="paso
                ${
                    preparando
                    ?
                    "completado"
                    :
                    estado === "CONFIRMADO"
                    ?
                    "actual"
                    :
                    ""
                }">

                <div class="paso-icono">
                    🍳
                </div>

                <div class="paso-texto">

                    <h4>
                        Preparando tu pedido
                    </h4>

                    <p>

                        Nuestro equipo está
                        preparando tus productos.

                    </p>

                </div>

            </div>


            <div class="paso
                ${
                    enCamino
                    ?
                    "completado"
                    :
                    estado === "PREPARANDO"
                    ?
                    "actual"
                    :
                    ""
                }">

                <div class="paso-icono">
                    🛵
                </div>

                <div class="paso-texto">

                    <h4>
                        En camino
                    </h4>

                    <p>

                        Tu pedido salió del local
                        rumbo a tu dirección.

                    </p>

                </div>

            </div>


            <div class="paso
                ${
                    entregado
                    ?
                    "completado"
                    :
                    estado === "EN CAMINO"
                    ?
                    "actual"
                    :
                    ""
                }">

                <div class="paso-icono">
                    🏠
                </div>

                <div class="paso-texto">

                    <h4>
                        Entregado
                    </h4>

                    <p>

                        Tu pedido llegó
                        a su destino.

                    </p>

                </div>

            </div>

        `;


        if (
            estado ===
            "CONFIRMADO"
        ) {

            mensaje =
                "✅ Tu pedido fue confirmado. En breve comenzaremos a prepararlo.";

        }


        if (
            estado ===
            "PREPARANDO"
        ) {

            mensaje =
                "🍳 Tu pedido ya se está preparando. Te avisaremos cuando salga para entrega.";

        }


        if (
            estado ===
            "EN CAMINO"
        ) {

            mensaje =
                "🛵 ¡Tu pedido ya está en camino! Mantente atento para recibirlo.";

        }


        if (
            estado ===
            "ENTREGADO"
        ) {

            mensaje =
                "✅ Tu pedido fue entregado. ¡Gracias por elegir MALHABER BURGER!";

        }

    }


    // ======================================
    // RECOJO EN TIENDA
    // ======================================

    else {

        const preparando =
            [
                "PREPARANDO",
                "LISTO"
            ].includes(
                estado
            );


        const listo =
            estado ===
            "LISTO";


        pasosHTML = `

            <div class="paso completado">

                <div class="paso-icono">
                    ✓
                </div>

                <div class="paso-texto">

                    <h4>
                        Pedido confirmado
                    </h4>

                    <p>

                        MALHABER BURGER
                        aceptó tu pedido.

                    </p>

                </div>

            </div>


            <div class="paso
                ${
                    preparando
                    ?
                    "completado"
                    :
                    estado === "CONFIRMADO"
                    ?
                    "actual"
                    :
                    ""
                }">

                <div class="paso-icono">
                    🍳
                </div>

                <div class="paso-texto">

                    <h4>
                        Preparando
                    </h4>

                    <p>

                        Estamos preparando
                        tus productos.

                    </p>

                </div>

            </div>


            <div class="paso
                ${
                    listo
                    ?
                    "completado"
                    :
                    estado === "PREPARANDO"
                    ?
                    "actual"
                    :
                    ""
                }">

                <div class="paso-icono">
                    🥡
                </div>

                <div class="paso-texto">

                    <h4>
                        Listo para recoger
                    </h4>

                    <p>

                        Puedes acercarte
                        a MALHABER BURGER.

                    </p>

                </div>

            </div>

        `;


        if (
            estado ===
            "CONFIRMADO"
        ) {

            mensaje =
                "✅ Tu pedido fue confirmado. En breve comenzaremos a prepararlo.";

        }


        if (
            estado ===
            "PREPARANDO"
        ) {

            mensaje =
                "🍳 Estamos preparando tu pedido. Te avisaremos cuando esté listo.";

        }


        if (
            estado ===
            "LISTO"
        ) {

            mensaje =
                "🥡 ¡Tu pedido está listo! Ya puedes acercarte a recogerlo.";

        }

    }


    // ======================================
    // CONTENIDO
    // ======================================

    contenedor.innerHTML = `

        <article class="pedido-card">


            <div class="pedido-header">

                <div>

                    <span class="codigo">

                        PEDIDO
                        ${pedido.codigo}

                    </span>


                    <h2>

                        ${
                            pedido.tipoPedido ===
                            "Delivery"

                            ?

                            "Seguimiento de tu delivery"

                            :

                            "Seguimiento de tu pedido"
                        }

                    </h2>

                </div>


                <span class="estado">

                    ${estado}

                </span>

            </div>


            <div class="datos-pedido">


                <div class="dato">

                    <small>
                        CLIENTE
                    </small>

                    <strong>
                        ${pedido.cliente}
                    </strong>

                </div>


                <div class="dato">

                    <small>
                        MODALIDAD
                    </small>

                    <strong>

                        ${
                            pedido.tipoPedido ===
                            "Delivery"

                            ?

                            "🛵 Delivery"

                            :

                            "🥡 Recojo en tienda"
                        }

                    </strong>

                </div>


                <div class="dato">

                    <small>
                        TOTAL
                    </small>

                    <strong>

                        S/
                        ${pedido.total.toFixed(2)}

                    </strong>

                </div>

            </div>


            <div class="tiempo-box">

                <div class="tiempo-icono">
                    ⏱
                </div>


                <div>

                    <span>
                        TIEMPO APROXIMADO
                    </span>

                    <strong>

                        ${tiempo}

                    </strong>

                </div>

            </div>


            <div class="progreso">

                <h3>
                    Estado del pedido
                </h3>

                ${pasosHTML}

            </div>


            ${
                pedido.tipoPedido ===
                "Delivery"

                ?

                `
                <div class="direccion">

                    <div class="direccion-icono">
                        📍
                    </div>

                    <div>

                        <small>
                            DIRECCIÓN DE ENTREGA
                        </small>

                        <strong>
                            ${pedido.direccion}
                        </strong>

                    </div>

                </div>
                `

                :

                ""
            }


            <div class="mensaje">

                ${mensaje}

            </div>


        </article>

    `;

}


// ==========================================
// CAMBIOS DESDE ADMIN
// ==========================================

window.addEventListener(
    "storage",
    renderizarPedido
);


// ==========================================
// ACTUALIZACIÓN AUTOMÁTICA
// ==========================================

setInterval(
    renderizarPedido,
    1200
);


// ==========================================
// INICIAR
// ==========================================

renderizarPedido();