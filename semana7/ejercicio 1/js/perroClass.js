import ApiResponse from "../lib/apiResponseDTO.js";
import Animal from "./animalClass.js";

export class Perro extends Animal {
    constructor(nombre, edad, raza){
        super(nombre, edad) 
        this.raza   = raza; 
    }

    getRaza(){
        return this.raza;
    }

    setRaza(raza){
        if (typeof raza !== 'string') {
            return 'Error: raza no valido';
        }
        this.raza = raza;
        return raza;
    }

    ladrar(){
        return `nombre: ${this.getNombre()}, ladra guagu guau`;
    }

    toString(){
        return `nombre: ${this.getNombre()}, edad: ${this.getEdad()}, raza: ${this.getRaza()}`;
    }
}
export default Perro;