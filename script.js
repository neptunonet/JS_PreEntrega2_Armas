/***********************************************************************
                    2da Pre entrega - Comision 71340
                      Alumno: Juan Ignacio Armas
 **********************************************************************/

// Variables
let option;
let valorVivienda = 0;
let valorSolicitado = 0; 
let valorCobraBNA = 0;
let valorAnios = 0;
let historialPrestamos = [];

// Funciones
function validarValores(valorVivienda, valorSolicitado, valorCobraBNA, valorAnios) {
    return valorVivienda > 0 && valorSolicitado > 0 && valorCobraBNA > 0 && valorAnios > 0;
}

// Script

// Inicio del programa

//Bienvenida
alert("Este es el simulador de créditos de BNA para la adquisición de vivienda única, le pediremos algunos datos para poder calcular su cuota inicial");

while (option !== 0) {
    let menu = prompt("Ingrese una opción(1-8):\n  1. Valor de la vivienda a adquirir\n  2. Monto a Solicitar (máximo 75%)\n  3. Plazo en Años\n  4. Indique si cobra haberes en el banco\n  5. Calcular Préstamo\n HISTORICO\n 6. Historial de prestamo calculado\n 7. Búsqueda por monto solicitado\n 8. Filtrado por plazo\n 0. Salir");
    
    //Menu de opciones
    switch (menu) { 

        case '1': // Valor de la vivienda
            valorVivienda = Number(prompt("Ingrese el valor de la vivienda en dólares:"));
            alert("El monto solicitado de la vivienda es: " + valorVivienda);
            break;

        case '2': // Monto a solicitar
            if (valorVivienda === 0) {
                alert("Regrese a la opción 1 e ingrese el valor de la propiedad");
                break;
            }
            valorSolicitado = Number(prompt("Ingrese el valor solicitado en dólares - Recuerde que no debe superar el 75% del valor de la vivienda:"));
            while (valorSolicitado > valorVivienda * 0.75) {
                valorSolicitado = Number(prompt("El valor solicitado supera el máximo del 75% - Ingrese el valor solicitado en dólares:"));
            }
            alert("El monto del préstamo solicitado es: " + valorSolicitado);
            break;

        case '3': // Plazo en años
            valorAnios = Number(prompt("Ingrese el plazo del préstamo en años:"));
            if (valorAnios > 0 && valorAnios <= 30) {
                alert("El plazo del préstamo solicitado es: " + valorAnios + " años");
            } else {
                alert("Regrese a la opción 3 e ingrese un valor válido");
            }
            break;

        case '4': // Indicar si cobra haberes en el banco
            let submenu = prompt("¿Cobra sus haberes en el Banco actualmente?\n  1. Sí\n  2. No\n");
            switch (submenu) {
                case '1':
                    valorCobraBNA = 4.5;
                    alert("Puede acceder a su préstamo con el " + valorCobraBNA + "% de Tasa Nominal Anual (TNA)");
                    break;

                case '2':
                    valorCobraBNA = 8;
                    alert("Puede acceder a su préstamo con el " + valorCobraBNA + "% de Tasa Nominal Anual (TNA)");
                    break;

                default:
                    alert("Regrese a la opción 4 e ingrese un valor correcto");
                    break;
            }
            break;

        case '5': // Calcular Préstamo
            if (validarValores(valorVivienda, valorSolicitado, valorCobraBNA, valorAnios)) {
                let tasaMensual = valorCobraBNA / 100 / 12;
                let numeroPagos = valorAnios * 12;
                let valorPrestamoMensual = valorSolicitado * (
                    (tasaMensual * Math.pow(1 + tasaMensual, numeroPagos)) /
                    (Math.pow(1 + tasaMensual, numeroPagos) - 1)
                );
                let detallePrestamo = {
                    valorVivienda: valorVivienda,
                    montoSolicitado: valorSolicitado,
                    tasaNominalAnual: valorCobraBNA,
                    plazoAnios: valorAnios,
                    cuotaMensual: valorPrestamoMensual.toFixed(2)
                };
                historialPrestamos.push(detallePrestamo);

                alert("Tu préstamo hipotecario sería:\n\n  - Valor de la Vivienda: " + valorVivienda + " USD\n  - Monto solicitado: " + valorSolicitado + " USD\n  - Tasa Nominal Anual: " + valorCobraBNA + "%\n  - Plazo: " + valorAnios + " años\n  - Cuota Mensual: " + valorPrestamoMensual.toFixed(2) + " USD");
            } else {
                alert("Algunos valores no son válidos:\n  * Valor de la Vivienda: " + valorVivienda + "\n  * Monto solicitado: " + valorSolicitado + "\n  * Tasa Nominal Anual: " + valorCobraBNA + "\n  * Plazo: " + valorAnios);
            }
            break;
        
        case '6': //Historial de prestamos
            if (historialPrestamos.length > 0) {
                let mensajeHistorial = "Historial de Préstamos:\n";
                historialPrestamos.forEach((prestamo, index) => {
                    mensajeHistorial += "\nPréstamo " + (index + 1) + ":\n" +
                                        "  - Valor de la Vivienda: " + prestamo.valorVivienda + " USD\n" +
                                        "  - Monto Solicitado: " + prestamo.montoSolicitado + " USD\n" +
                                        "  - Tasa Nominal Anual: " + prestamo.tasaNominalAnual + "%\n" +
                                        "  - Plazo: " + prestamo.plazoAnios + " años\n" +
                                        "  - Cuota Mensual: " + prestamo.cuotaMensual + " USD\n";
                });
                alert(mensajeHistorial);
            } else {
                alert("No hay préstamos en el historial.");
            }
            break;    
        
        case '7': // Búsqueda por monto solicitado
            let montoBusqueda = Number(prompt("Ingrese el monto solicitado para buscar:"));
            let prestamosPorMonto = historialPrestamos.filter(prestamo => prestamo.montoSolicitado === montoBusqueda);
            if (prestamosPorMonto.length > 0) {
                let mensaje = "Préstamos encontrados:\n";
                prestamosPorMonto.forEach((prestamo, index) => {
                    mensaje += `${index + 1}. Monto Solicitado: ${prestamo.montoSolicitado}, Plazo: ${prestamo.plazoAnios} años, Cuota Mensual: ${prestamo.cuotaMensual} USD\n`;
                });
                alert(mensaje);
            } else {
                alert("No se encontraron préstamos con el monto solicitado.");
            }
            break;
        
        case '8': // Filtrado por plazo
            let plazoBusqueda = Number(prompt("Ingrese el plazo en años para filtrar:"));
            let prestamosPorPlazo = historialPrestamos.filter(prestamo => prestamo.plazoAnios === plazoBusqueda);
            if (prestamosPorPlazo.length > 0) {
                let mensaje = "Préstamos encontrados:\n";
                prestamosPorPlazo.forEach((prestamo, index) => {
                    mensaje += `${index + 1}. Monto Solicitado: ${prestamo.montoSolicitado}, Plazo: ${prestamo.plazoAnios} años, Cuota Mensual: ${prestamo.cuotaMensual} USD\n`;
                });
                alert(mensaje);
            } else {
                alert("No se encontraron préstamos con el plazo especificado.");
            }
            break;
        
        case '0':
            alert("Espero que vuelvas a calcular tu préstamo, ¡nos vemos la próxima!");
            option = 0;
            break;

        default:
            alert("No puedo interpretar el valor ingresado, intenta nuevamente con un número válido.");
            break;
    }
}
                        