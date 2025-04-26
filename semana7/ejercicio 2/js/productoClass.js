import ApiResponse from '../lib/apiResponseDTO.js';

export class Producto {
    constructor(nombre, precio, stock) {
        this.nombre  = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    vender(cantidad) {
        if (this.stock >= cantidad) {
            this.stock -= cantidad;
        } else {
            console.log(`No hay suficiente stock de ${this.nombre}, stock: ${this.stock()}.`)
        }
    }

    toString() {
        return `Nombre: ${this.nombre()}, precio: ${this.precio()}, stock: ${this.stock()}`;
    }
}

export default Producto;
