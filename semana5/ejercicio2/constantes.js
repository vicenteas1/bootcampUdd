/**
 * Generacion Calculadodra
 * Bootcamp UDD
 * 
 * Creacion: VICENTE SAAVEDRA
 *  */

export class Constantes {
    static cInicioIdiomas   = "Bienvenido. Selecciona un idioma:";
    static cIOperation      = "Introduce el idioma que deseas utilizar: \n 1: Español\n 2: Inglés\n 3: Portugués\n 4: Chino\n 5: Japonés\n 6: Salir";
    static cIAccion         = "¿Qué deseas hacer?\n1: Saludar\n2: Despedirse";
    static cSalir           = "¡Hasta luego!";
    static cOperacionError  = "Opción no válida";
    static cError           = "Error en ejecución";
    static cIdiomas         = {
        es: { saludo: "Hola", despedida: "Adiós" },
        en: { saludo: "Hello", despedida: "Goodbye" },
        pt: { saludo: "Olá", despedida: "Tchau" },
        zh: { saludo: "你好", despedida: "再见" },
        jp: { saludo: "こんにちは", despedida: "さようなら" }
    };
}
