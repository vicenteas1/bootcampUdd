import ApiResponse from '../lib/apiResponseDTO.js';

export class Vehiculo {
    constructor(marca, modelo, anio, estado = 0) {
        this.marca  = marca;
        this.modelo = modelo;
        this.anio   = anio;
        this.estado = estado;
    
    }

    getMarca(){
        return this.marca;
    }

    setMarca(marca){
        if (typeof marca !== 'string') {
            return 'Error: marca no valido';
        }
        this.marca = marca;
        return marca;
    }

    getModelo(){
        return this.modelo;
    }

    setModelo(modelo){
        if (typeof modelo !== 'string') {
            return 'Error: modelo no valido';
        }
        this.modelo = modelo;
        return modelo;
    }

    getAnio(){
        return this.anio;
    }

    setAnio(anio){
        if (typeof anio !== 'number' || isNaN(anio) || anio <= 0) {
            return 'Error: año no valido';
        }
        this.anio = anio;
        return anio;
    }

    getEstado(){
        return this.estado;
    }

    setEstado(estado){
        if (typeof estado !== 'number' || isNaN(estado) || estado < 0 || estado > 1) {
            return 'Error: estado no valido';
        }
        this.estado = estado;
        return estado;
    }

    toString() {
        return `Marca: ${this.getMarca()}, Modelo: ${this.getModelo()}, Año: ${this.getAnio()}, Estado: ${this.getEstado()}`;
    }

    arrancar() {
        try {
            const esValido = this.validarEstado(1);
            if(!esValido){
                return new ApiResponse({
                    message: 'Estado no valido. El vehiculo ya se encuentra andando',
                    data: this.getEstado(),
                    statusCode: 400
                });
            }
            this.setEstado(1);
            return new ApiResponse({
                message: this.toString(),
                data: this,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: 'Error al intentar arrancar',
                data: error.message || error,
                statusCode: 400
            });   
        }
    }
    
    detener() {
        try {
            const esValido = this.validarEstado(0);
            if(!esValido){
                return new ApiResponse({
                    message: 'Estado no valido. El vehiculo ya se encuentra detenido',
                    data: this.getEstado(),
                    statusCode: 400
                });
            }
            this.setEstado(0);
            return new ApiResponse({
                message: this.toString(),
                data: this,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: 'Error al intentar arrancar',
                data: error.message || error,
                statusCode: 400
            });   
        }
    }

    validarEstado(estado) {
        try {
            const tipoEstado = estado == 1 ? 'marcha' : 'detenido';
            if (this.getEstado() === estado) {
                console.info(`Atención: El vehículo ya se encuentra en estado: ${tipoEstado}`);
                return false;
            }
            return true;
        } catch (error) {   
            console.error(error);
            return false;
        }
    }
}

export default Vehiculo;
