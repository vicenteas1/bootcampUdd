import ApiResponse from '../lib/apiResponseDTO.js';

export class Animal {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad   = edad;
    }

    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        if (typeof nombre !== 'string') {
            return 'Error: Nombre no valido';
        }
        this.nombre = nombre;
        return nombre;
    }

    getEdad(){
        return this.edad;
    }

    setEdad(edad){
        if (typeof edad !== 'number' || isNaN(edad) || edad <= 0) {
            return 'Error: edad no valido';
        }
        this.edad = edad;
        return edad;
    }

    toString() {
        return `Nombre: ${this.getNombre()}, Edad: ${this.getEdad()}`;
    }
    
}

export default Animal;
