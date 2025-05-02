export class Libro {
    constructor(titulo, autor, anio , disponible = 1) {
        this.titulo     = titulo;
        this.autor      = autor;
        this.anio       = anio;
        this.disponible = disponible;
    }

    getTitulo(){
        return this.titulo;
    }

    setTitulo(titulo){
        if (typeof titulo !== 'string') {
            return 'Error: Valor titulo no valido';
        }
        this.titulo = titulo;
        return titulo;
    }

    getAutor(){
        return this.autor;
    }

    setAutor(autor){
        if (typeof autor !== 'string') {
            return 'Error: Valor autor no valido';
        }
        this.autor = autor;
        return autor;
    }

    getAnio(){
        return this.anio;
    }

    setAnio(anio){
        if (typeof anio !== 'number' || isNaN(anio) || anio <= 0) {
            return 'Error: Valor año no valido';
        }
        this.anio = anio;
        return anio;
    }

    getDisponible(){
        return this.disponible;
    }

    setDisponible(disponible){
        if (typeof disponible !== 'number' || isNaN(disponible) || disponible < 0 || disponible > 1) {
            return 'Error: Valor disponible no valido';
        }
        this.disponible = disponible;
        return disponible;
    }

    toString(){
        return `titulo: ${this.getTitulo()}, autor: ${this.getAutor()}, año: ${this.getAnio()}, disponible: ${this.getDisponible()}`;
    }
}

export default Libro;
