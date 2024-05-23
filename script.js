/***********************************************************************
                    1er Pre entrega - Comision 71340
                        Alumno: Juan Ignacio Armas
 **********************************************************************/

alert("Este es el simulador de creditos de BNA para la adquisicion de vivienda unica, le pediremos algunos datos para poder calcular su cuota inical");

//Variables
let option;
let valorVivienda = 0;
let valorSolicitado = 0; 
let valorCobraBNA = 0;
let valorAnios = 0;

//Funciones
function validarValores(valorVivienda, valorSolicitado, valorCobraBNA, valorAnios) {
    if (valorVivienda > 0 && valorSolicitado > 0 && valorCobraBNA > 0 && valorAnios > 0) {
        return true;
    } else {
        return false;
    }
}


//Script
while (option != 0) {
  let menu = prompt("Ingrese una opción:\n  1. Valor de la vivienda a adquirir\n  2. Monto a Solicitar (maximo 75%)\n  3. Plazo en Años\n  4. Indique si cobra haberes en el banco\n  5. Calcular Prestamo\n  0. Salir");
  
  switch (menu) {
    case '1':
        valorVivienda = Number(prompt("Ingrese el valor de la vivienda en dolares:"));
        alert("El monto solicitado de la vivienda es: " +valorVivienda);
        break;

    case '2':
        valorSolicitado = Number(prompt("Ingrese el valor solicitado en dolares - Recuerde que no debe superar el 75% del valor de la vivienda:"));
        if (valorVivienda == 0) {
            alert("Regrese a la opción 1 e ingrese el valor de la propidedad");
            break;
        }else {
            while (((valorVivienda*0.75)<valorSolicitado)) {
                valorSolicitado = Number(prompt("El valor solicitado supera el maximo del 75% - Ingrese el valor solicitado en dolares"));
            }
            alert("El monto del prestamo solicitado es: " +valorSolicitado);
        }
        break;

    case '3':
        valorAnios = Number(prompt("Ingrese el plazo del prestamo en años"));
        if (valorAnios>0 && valorAnios<=30) {
            alert("El monto del prestamo solicitado es: " +valorAnios);    
        }else {
            alert("Regrese a la opción 3 e ingrese el valor valido");
            break;
        }
        break;

    case '4':
        let submenu = prompt("Cobra sus haberes en el Banco actualmente?\n  1. Si\n  2. No\n");
        switch (submenu) {
            case '1':
                valorCobraBNA = 4.5;
                alert("Puede acceder a su prestamo con el "+valorCobraBNA+"% de Tasa Nominal Anual (TNA)");
                break;

            case '2':
                valorCobraBNA = 8;
                alert("Puede acceder a su prestamo con el "+valorCobraBNA+"% de Tasa Nominal Anual (TNA)");
                break;

            default:
                alert("Regrese a la opción 4 e ingrese un valor correcto");
                break;
        }
        break;
    
    case '5':

        if (validarValores(valorVivienda, valorSolicitado, valorCobraBNA, valorAnios)) {

            let tasaMensual = valorCobraBNA / 100 / 12;
            let numeroPagos = valorAnios * 12;
            let valorPrestamoMensual = valorSolicitado * ((tasaMensual * Math.pow(1 + tasaMensual, numeroPagos)) / (Math.pow(1 + tasaMensual, numeroPagos) - 1));

            alert("Tu prestamos Hipotecario seria:\n \n  - Valor de la Vivienda: "+ valorVivienda+"usd\n  - Monto solicitado: " + valorSolicitado + "usd\n  - Tasa Nominal Anual: " + valorCobraBNA + "%\n  - Plazo: " + valorAnios + "años\n  - Cuota Mensual: " + valorPrestamoMensual + "usd");
            option = 0;
        } else {
            alert("Algunos valores no son validos:\n  * Valor de la Vivienda: "+ valorVivienda+"\n  * Monto solicitado: "+valorSolicitado+"\n  * Tasa Nominal Anual: "+valorCobraBNA+"\n  * Plazo: " + valorAnios);
        }
        break ;

    case '0':
        alert("Espero que vuelvas a calcular tu prestamo, nos vemos la próxima!");
        option = 0;
        break;

    default:
        alert("No puedo interpretar el valor ingresado, intenta nuevamente con un numero valido.");
        break;
  }
}

