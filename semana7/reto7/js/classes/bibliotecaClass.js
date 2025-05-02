import ApiResponse from "../../lib/apiResponseDTO.js";
import Libro from "./libroClass.js";
import LibroInfantil from "./libroInfantilClass.js";

export class Biblioteca {
    constructor(){
        this.libros = [];
        return 'constructor creado'
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

            const libro = this.libros[index];

            if (libro instanceof LibroInfantil) {
                return new ApiResponse({
                    message: `Este libro requiere validación de edad. Usa prestarLibroExacto() con la edad del lector.`,
                    data: libro,
                    statusCode: 403
                });
            }

            libro.setDisponible(0);

            return new ApiResponse({
                message: mensaje,
                data: libro,
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

            const libro = this.libros[index];

            if(edad !== null && libro.getEdadMinima() < edad){
                return new ApiResponse({
                    message: `El lector no cumple con la edad mínima para este libro. Libro: ${libro}`,
                    data: null,
                    statusCode: 403
                });
            };
    
            libro.setDisponible(0);

            return new ApiResponse({
                message: mensaje,
                data: libro,
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

            const libro = this.libros[index];

            libro.setDisponible(1);

            return new ApiResponse({
                message: mensaje,
                data: libro,
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

    listarLibrosDisponibles(){
        const disponibles = this.libros.filter(libro => libro.getDisponible() === 1);
        return new ApiResponse({
            message: `Se encontraron ${disponibles.length} libro(s) disponible(s).`,
            data: disponibles,
            statusCode: 200
        });
    }

    listarLibrosPrestados(){
        const prestados = this.libros.filter(libro => libro.getDisponible() === 0);
        return new ApiResponse({
            message: `Se encontraron ${prestados.length} libro(s) prestados(s).`,
            data: prestados,
            statusCode: 200
        });
    }
}

export default Biblioteca;
