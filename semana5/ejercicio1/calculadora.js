/**
 * Generacion Calculadodra
 * Bootcamp UDD
 *
 * Creacion: VICENTE SAAVEDRA
 *  */
import { Constantes } from "./constantes.js";


export function calculadora() {
    calculadora();

    function calculadora() {
        alert(Constantes.cInicioCalculadora);
        let salir = false;

        while (!salir) {
            try {
                let operation = parseInt(prompt(Constantes.cIOperation));
                if (operation == 5) {
                    salir = true;
                    alert(Constantes.cSalir);
                    return;
                }
                let firstNumber     = parseFloat(prompt(Constantes.cIPrimerNumero));
                let secondNumber    = parseFloat(prompt(Constantes.cISegundoNumero));
                let response;

                switch (operation) {
                    case 1:
                        response = sumar(firstNumber, secondNumber);
                        break;
                    case 2:
                        response = resta(firstNumber, secondNumber);
                        break;
                    case 3:
                        response = multiplicacion(firstNumber, secondNumber);
                        break;
                    case 4:
                        response = division(firstNumber, secondNumber);
                        break;
                    default:
                        alert(`${Constantes.cOperacionError}: ${operation}`);
                        break;
                }
            } catch (error) {
                console.error(`${Constantes.cError}: ${error}`);
            }
        }

    }

    function sumar(firstNumber, secondNumber) {
        response = firstNumber + secondNumber;
        alert(
            `${Constantes.cSumando}: ${firstNumber} ${Constantes.cCon} ${secondNumber}...\n ${Constantes.cResultado}: ${response}`
        );
        return response
    }

    function resta(firstNumber, secondNumber) {
        response = firstNumber - secondNumber;
        alert(
            `${Constantes.cRestando}: ${firstNumber} ${Constantes.cCon} ${secondNumber}...\n ${Constantes.cResultado}: ${response}`
        );
        return response
    }

    function multiplicacion(firstNumber, secondNumber) {
        response = firstNumber * secondNumber;
        alert(
            `${Constantes.cMultiplicando}: ${firstNumber} ${Constantes.cCon} ${secondNumber}...\n ${Constantes.cResultado}: ${response}`
        );
        return response
    }

    function division(firstNumber, secondNumber) {
        response = firstNumber / secondNumber;
        if (secondNumber === 0) {
            alert(`${Constantes.cDivisionCero}`);
        }
        alert(
            `${Constantes.cDividiendo}: ${firstNumber} ${Constantes.cCon} ${secondNumber}...\n ${Constantes.cResultado}: ${response}`
        );
        return response
    }
}

