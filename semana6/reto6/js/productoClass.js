import ApiResponse from "../lib/apiResponseDTO.js";

export class Producto {

    nombre = this.nombre;
    precio = this.precio;

    constructor(nombre, precio){
        this.nombre = nombre; 
        this.precio = precio; 
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

    getPrecio(){
        return this.precio;
    }

    setPrecio(precio){
        if (typeof precio !== 'number' || isNaN(precio) || precio <= 0) {
            return 'Error: Precio no valido';
        }
        this.precio = precio;
        return precio;
    }

    toString(){
        return `nombre: ${this.getNombre}, precio: ${this.precio}`;
    }

    static crearProducto(nombre, precio) {
        try {
            const producto = new Producto('', 0);
    
            const validar = (setter, valor) => {
                const result = setter.call(producto, valor);
                if (typeof result === 'string' && result.startsWith('Error')) {
                    throw new Error(result);
                }
            };
    
            validar(producto.setNombre, nombre);
            validar(producto.setPrecio, precio);
    
            return new ApiResponse({
                message: 'Producto creado con éxito',
                data: producto,
                statusCode: 201
            });
    
        } catch (error) {
            return new ApiResponse({
                message: 'Error al crear el producto',
                data: error.message || error,
                statusCode: 400
            });
        }
    }
}
export default Producto;