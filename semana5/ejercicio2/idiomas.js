/**
 * Generacion Diccionario
 * Bootcamp UDD
 *
 * Creacion: VICENTE SAAVEDRA
 *  */
import { Constantes } from "./constantes.js";

function idiomas() {
    alert(Constantes.cInicioIdiomas);
    let salir = false;

    while (!salir) {
        try {
            let operation = parseInt(prompt(Constantes.cIOperation));
            if (isNaN(operation)) {
                alert(Constantes.cOperacionError);
                continue;
            }
            if (operation === 6) {
                salir = true;
                alert(Constantes.cSalir);
                return;
            }

            const languageMap = {
                1: Constantes.cIdiomas.es,
                2: Constantes.cIdiomas.en,
                3: Constantes.cIdiomas.pt,
                4: Constantes.cIdiomas.zh,
                5: Constantes.cIdiomas.jp
            };
            
            let lang = languageMap[operation];
            
            if (!lang) {
                alert(`${Constantes.cOperacionError}: ${operation}`);
                continue;
            }

            let accion = parseInt(prompt(Constantes.cIAccion));
            if (isNaN(accion)) {
                alert(Constantes.cOperacionError);
                continue;
            }
            switch (accion) {
                case 1:
                    alert(saludar(lang));
                    break;
                case 2:
                    alert(despedirse(lang));
                    break;
                default:
                    alert(`${Constantes.cOperacionError}: ${accion}`);
                    break;
            }

        } catch (error) {
            console.error(`${Constantes.cError}: ${error}`);
        }
    }
}

function saludar(lang) {
    return lang.saludo;
}

function despedirse(lang) {
    return lang.despedida;
}

export {idiomas}