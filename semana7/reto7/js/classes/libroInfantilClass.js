import Libro from "./libroClass.js";

export class LibroInfantil extends Libro {
    constructor(titulo, autor, anio, disponible = 1, edadMinima) {
        super(titulo, autor, anio , disponible);
        this.edadMinima = edadMinima; 
    }

    getEdadMinima(){
        return this.edadMinima;
    }

    setEdadMinima(edadMinima){
        if (typeof edadMinima !== 'number' || isNaN(edadMinima) || edadMinima <= 0 ) {
            return 'Error: Valor edad Minima no valido';
        }
        this.edadMinima = edadMinima;
        return edadMinima;
    }

    toString(){
        return `titulo: ${this.getTitulo()}, autor: ${this.getAutor()}, año: ${this.getAnio()}, disponible: ${this.getDisponible()}, edad minima: ${this.getEdadMinima()}`;
    }
}

export default LibroInfantil;
