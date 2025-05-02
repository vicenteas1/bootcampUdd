import ApiResponse from "../../lib/apiResponseDTO.js";
import Libro from "./libroClass.js";
import LibroInfantil from "./libroInfantilClass.js";

export class Biblioteca {
    constructor(){
        this.libros = [];
    }

    agregarLibro(titulo, autor, anio, disponible = 1){
        try {
            const libro = new Libro(titulo, autor, anio, disponible);
            const validar = (setter, valor) => {
                const result = setter.call(libro, valor);
                if (typeof result === 'string' && result.startsWith('Error')) {
                    throw new Error(result);
                }
            };
    
            validar(libro.setTitulo, titulo);
            validar(libro.setAutor, autor);
            validar(libro.setAnio, anio);
            validar(libro.setDisponible, disponible);

            this.libros.push(libro)

            return new ApiResponse({
                message: 'Libro agregado con éxito',
                data: libro,
                statusCode: 201
            });
        } catch (error) {
            return new ApiResponse({
                message: 'Error al agregar el libro',
                data: error.message || error,
                statusCode: 400
            }); 
        }
    }

    agregarLibroInfantil(titulo, autor, anio, edadMinima, disponible = 1){
        try {
            const libroInfantil = new LibroInfantil(titulo, autor, anio, disponible, edadMinima);
            const validar = (setter, valor) => {
                const result = setter.call(libroInfantil, valor);
                if (typeof result === 'string' && result.startsWith('Error')) {
                    throw new Error(result);
                }
            };
    
            validar(libroInfantil.setTitulo, titulo);
            validar(libroInfantil.setAutor, autor);
            validar(libroInfantil.setAnio, anio);
            validar(libroInfantil.setDisponible, disponible);
            validar(libroInfantil.setEdadMinima, edadMinima);

            this.libros.push(libroInfantil)

            return new ApiResponse({
                message: 'Libro infantil agregado con éxito',
                data: libroInfantil,
                statusCode: 201
            });
        } catch (error) {
            return new ApiResponse({
                message: 'Error al agregar el libro infantil',
                data: error.message || error,
                statusCode: 400
            }); 
        }
    }

    buscarPorTitulo(titulo) {
        try {
            const encontrados = this.libros.filter(libro =>
                libro.getTitulo().toLowerCase().includes(titulo.toLowerCase())
            );
    
            const mensaje = encontrados.length > 0
            ? `Se encontraron ${encontrados.length} libro(s) con el título "${titulo}".`
            : `No se encontraron libros con el título "${titulo}".`;

            return new ApiResponse({
                message: mensaje,
                data: encontrados,
                statusCode: 200
            });           
        } catch (error) {
            return new ApiResponse({
                message: 'Error al buscar el título',
                data: error.message || error,
                statusCode: 400
            });
        }
    }

    buscarLibroExacto(titulo, autor, anio) {
        try {
            const encontrados = this.libros.filter(libro =>
                libro.getTitulo().toLowerCase().trim() == titulo.toLowerCase().trim()
                &&  libro.getAutor().toLowerCase().trim() == autor.toLowerCase().trim() 
                &&  libro.getAnio() == anio
            );
    
            const mensaje = encontrados.length > 0
            ? `Se encontraron ${encontrados.length} libro(s) con el título "${titulo}".`
            : `No se encontraron libros con el título "${titulo}".`;

            return new ApiResponse({
                message: mensaje,
                data: encontrados,
                statusCode: 200
            });           
        } catch (error) {
            return new ApiResponse({
                message: 'Error al buscar el título',
                data: error.message || error,
                statusCode: 400
            });
        }
    }

    prestarLibro(titulo) {
        try {
            const index = this.libros.findIndex(libro =>
                libro.getTitulo().toLowerCase().includes(titulo.toLowerCase()) 
                && libro.getDisponible() === 1
            );
    
            const mensaje = index >= 0
            ? `Se encontró el libro: "${titulo}". Se cambiará el estado a prestado.`
            : `No se encontraron libros con el título "${titulo}".`;

            if (index === -1) {
                return new ApiResponse({
                    message: mensaje,
                    data: null,
                    statusCode: 404
                });
            }

            this.libros[index].setDisponible(0);

            return new ApiResponse({
                message: mensaje,
                data: this.libros[index],
                statusCode: 200
            });           
        } catch (error) {
            return new ApiResponse({
                message: 'Error al buscar el título',
                data: error.message || error,
                statusCode: 400
            });
        }
    }

    prestarLibroExacto(titulo, autor, anio, edad = null) {
        try {
            const index = this.libros.findIndex(libro =>
                libro.getTitulo().toLowerCase().trim() == titulo.toLowerCase().trim()
                &&  libro.getAutor().toLowerCase().trim() == autor.toLowerCase().trim() 
                &&  libro.getAnio() == anio
                &&  libro.getDisponible() === 1
            );

            const mensaje = index >= 0
            ? `Se encontró el libro: "${titulo}". Se cambiará el estado a prestado.`
            : `No se encontraron libros con el título "${titulo}".`;

            if (index === -1) {
                return new ApiResponse({
                    message: mensaje,
                    data: null,
                    statusCode: 404
                });
            }

            if(edad !== null && this.libros[index].getEdadMinima() < edad){
                return new ApiResponse({
                    message: `El lector no cumple con la edad mínima para este libro. Libro: ${this.libros[index]}`,
                    data: null,
                    statusCode: 403
                });
            };
    
            this.libros[index].setDisponible(0);

            return new ApiResponse({
                message: mensaje,
                data: this.libros[index],
                statusCode: 200
            });           
        } catch (error) {
            return new ApiResponse({
                message: 'Error al buscar el título',
                data: error.message || error,
                statusCode: 400
            });
        }
    }

    disponibilizarLibro(titulo, autor, anio) {
        try {
            const index = this.libros.findIndex(libro =>
                    libro.getTitulo().toLowerCase().trim() == titulo.toLowerCase().trim()
                &&  libro.getAutor().toLowerCase().trim() == autor.toLowerCase().trim() 
                &&  libro.getAnio() == anio
                &&  libro.getDisponible() === 0
            );
    
            const mensaje = index >= 0
            ? `Se encontró el libro: "${titulo}". Se cambiará el estado a disponible.`
            : `No se encontraron libros con el título "${titulo}".`;

            if (index === -1) {
                return new ApiResponse({
                    message: mensaje,
                    data: null,
                    statusCode: 404
                });
            }

            this.libros[index].setDisponible(1);

            return new ApiResponse({
                message: mensaje,
                data: this.libros[index],
                statusCode: 200
            });           
        } catch (error) {
            return new ApiResponse({
                message: 'Error al buscar el título',
                data: error.message || error,
                statusCode: 400
            });
        }
    }

    listarLibros(){
        return new ApiResponse({
            message: 'Lista de libros',
            data: this.libros,
            statusCode: 200
        });
    }
}

export default Biblioteca;
