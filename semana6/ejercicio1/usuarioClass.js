import { ApiResponse } from './apiResponseDto.js';

export class Usuario {
    constructor(nombre, apellido, correoElectronico, ocupacion, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correoElectronico = correoElectronico;
        this.ocupacion = ocupacion;
        this.edad = edad;
    }

    // Getters y Setters
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        if (typeof nombre !== 'string') {
            return 'Error al setear nombre';
        }
        this.nombre = nombre;
        return this.nombre;
    }

    getApellido() {
        return this.apellido;
    }
    setApellido(apellido) {
        if (typeof apellido !== 'string') {
            return 'Error al setear apellido';
        }
        this.apellido = apellido;
        return this.apellido;
    }

    getCorreoElectronico() {
        return this.correoElectronico;
    }
    setCorreoElectronico(correoElectronico) {
        if (typeof correoElectronico !== 'string' || !correoElectronico.includes('@') || !correoElectronico.includes('.')) {
            return 'Error al setear correoElectronico';
        }
        this.correoElectronico = correoElectronico;
        return this.correoElectronico;
    }

    getOcupacion() {
        return this.ocupacion;
    }
    setOcupacion(ocupacion) {
        if (typeof ocupacion !== 'string') {
            return 'Error al setear ocupacion';
        }
        this.ocupacion = ocupacion;
        return this.ocupacion;
    }

    getEdad() {
        return this.edad;
    }
    setEdad(edad) {
        if (typeof edad !== 'number' || isNaN(edad) || edad < 0 || edad > 120) {
            return 'Error: La edad debe ser un número válido entre 0 y 120';
        }
        this.edad = edad;
        return this.edad;
    }

    toString() {
        return `Nombre: ${this.getNombre()} ${this.getApellido()}, Correo: ${this.getCorreoElectronico()}, Ocupación: ${this.getOcupacion()}, Edad: ${this.getEdad()}`;
    }

    static crearUsuario(nombre, apellido, correoElectronico, ocupacion, edad) {
        try {
            const usuario = new Usuario('', '', '', '', 0);
    
            const validar = (setter, valor) => {
                const result = setter.call(usuario, valor);
                if (typeof result === 'string' && result.startsWith('Error')) {
                    throw new Error(result);
                }
            };
    
            validar(usuario.setNombre, nombre);
            validar(usuario.setApellido, apellido);
            validar(usuario.setCorreoElectronico, correoElectronico);
            validar(usuario.setOcupacion, ocupacion);
            validar(usuario.setEdad, edad);
    
            return new ApiResponse({
                message: 'Usuario creado con éxito',
                data: usuario,
                statusCode: 201
            });
    
        } catch (error) {
            return new ApiResponse({
                message: 'Error al crear el usuario',
                data: error.message || error,
                statusCode: 400
            });
        }
    }

    static ejemplo() {
        const respuesta = Usuario.crearUsuario('vicente', 'saavedra', 'v@a.cl', 'estudiante', 30);
        console.log(respuesta.toString());
    }

}

export default Usuario;
