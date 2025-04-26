import ApiResponse from '../lib/apiResponseDTO.js';
import Producto from './productoClass.js';

export class Libro extends Producto {
    constructor(nombre, precio, autor) {
        super(nombre, precio);
        this.autor = autor;
    }

    getAutor(){
        return this.autor;
    }

    setAutor(autor){
        if (typeof autor !== 'string') {
            return 'Error: autor no valido';
        }
        this.autor = autor;
        return autor;
    }

    resumen(){
        return `nombre: ${this.getNombre()}, precio: ${this.getPrecio()}, autor: ${this.getAutor()}`;
    }
}

export default Libro;
