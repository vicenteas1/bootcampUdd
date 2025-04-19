import Producto from './productoClass.js';
import ApiResponse from './../lib/apiResponseDTO.js';

export class Catalogo {
    constructor() {
        this.catalogo = [];
    }

    /**
     * Función de declaración:
     * Se define como método tradicional dentro de la clase.
     * Puede ser llamada antes de su definición gracias al hoisting (fuera de clases).
     */
    agregarProducto(nombre, precio) {
        try {
            const resultado = Producto.crearProducto(nombre, precio);
            
            if (resultado.getStatusCode() === 201) {
                this.catalogo.push(resultado.getData());
            }
    
            return resultado;
        } catch (error) {
            return new ApiResponse({
                message: 'Error al agregar el producto',
                data: error.message || error,
                statusCode: 400
            });
        }
    }
    

    /**
     * Función de expresión:
     * Asignada como una propiedad del objeto, no tiene hoisting.
     */
    eliminarProducto = function(nombre) {
        try {
            if (typeof nombre !== 'string') {
                return new ApiResponse({
                    message: 'Nombre en formato no valido.',
                    data: null,
                    statusCode: 400
                }); 
            }

            const originalLength = this.catalogo.length;
            this.catalogo        = this.catalogo.filter(producto => producto.getNombre() !== nombre);
            const eliminado      = this.catalogo.length < originalLength;
    
            return new ApiResponse({
                message: eliminado ? "Producto eliminado" : "Producto no encontrado",
                data: nombre,
                statusCode: eliminado ? 200 : 404
            });
        } catch (error) {
            return new ApiResponse({
                message: 'Error al eliminar el producto',
                data: error.message || error,
                statusCode: 400
            }); 
        }
    }

    /**
     * Función anónima:
     * Usada como callback dentro del método find.
     */
    buscarProducto = function(nombre) {
        try {
            if (typeof nombre !== 'string') {
                return new ApiResponse({
                    message: 'Nombre en formato no valido.',
                    data: null,
                    statusCode: 400
                }); 
            }
            const producto = this.catalogo.find(function(producto) {
                return producto.getNombre() === nombre;
            });
    
            return new ApiResponse({
                message: producto ? "Producto encontrado" : "Producto no encontrado",
                data: producto,
                statusCode: producto ? 200 : 404
            });   
        } catch (error) {
            return new ApiResponse({
                message: 'Error al buscar el producto',
                data: error.message || error,
                statusCode: 400
            });  
        }
    }

    /**
     * Función de flecha:
     * Sintaxis compacta, no tiene su propio this.
     */
    mostrarProductos = () => {
        try {
            return new ApiResponse({
                message: "Catálogo actual",
                data: this.catalogo,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: 'Error al mostrar el catalogo de productos',
                data: error.message || error,
                statusCode: 400
            });  
        }
    }
}

export default Catalogo;
