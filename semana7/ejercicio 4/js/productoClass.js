import ApiResponse from '../lib/apiResponseDTO.js';

export class Producto {
    constructor(nombre, precio) {
        this.nombre  = nombre;
        this.precio = precio;
    }

    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        if (typeof nombre !== 'string') {
            return 'Error: nombre no valido';
        }
        this.nombre = nombre;
        return nombre;
    }

    getPrecio(){
        return this.precio;
    }

    setPrecio(precio){
        if (typeof precio !== 'number' || isNaN(precio) || precio <= 0) {
            return 'Error: precio no valido';
        }
        this.precio = precio;
        return precio;
    }

    toString() {
        return `Nombre: ${this.getNombre()}, precio: ${this.getPrecio()}`;
    }
}

export default Producto;
