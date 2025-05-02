# 📚 Sistema de Biblioteca en JavaScript (POO)

## 🧾 Descripción

Este proyecto implementa un sistema de gestión de biblioteca utilizando **Programación Orientada a Objetos (POO)** en JavaScript. A través de este sistema, puedes agregar libros, realizar préstamos, buscar ejemplares y validar restricciones de edad para libros infantiles.

El diseño está basado en los pilares de la POO:

- **Encapsulamiento**
- **Herencia**
- **Polimorfismo**
- **Abstracción**

---

## 🧱 Estructura del Proyecto

### 🔹 `Libro`
Clase base para libros generales.

**Propiedades:**
- `titulo` (string)
- `autor` (string)
- `anio` (number)
- `disponible` (0 o 1)

**Métodos:**
- Getters y setters con validación
- `toString()`

---

### 🔹 `LibroInfantil` (hereda de `Libro`)
Extiende `Libro` añadiendo una edad mínima recomendada.

**Propiedad adicional:**
- `edadMinima` (number)

**Métodos:**
- Getters y setters validados
- `toString()` personalizado

---

### 🔹 `Biblioteca`
Clase que administra una colección de libros.

**Métodos disponibles:**
- `agregarLibro(titulo, autor, anio, disponible)`
- `agregarLibroInfantil(titulo, autor, anio, edadMinima, disponible)`
- `buscarPorTitulo(titulo)`
- `buscarLibroExacto(titulo, autor, anio)`
- `prestarLibro(titulo)`  
  ➤ Si el libro es infantil, devuelve error `403` y pide usar `prestarLibroExacto()`  
- `prestarLibroExacto(titulo, autor, anio, edad)`  
  ➤ Valida edad mínima si aplica  
- `disponibilizarLibro(titulo, autor, anio)`
- `listarLibros()` – Lista todos
- `listarLibrosDisponibles()` – Solo disponibles
- `listarLibrosPrestados()` – Solo prestados

---

### 🔹 `ApiResponse`

Clase para estandarizar las respuestas del sistema.

```js
new ApiResponse({
  message: "Texto explicativo",
  data: objetoDeDatos,
  statusCode: 200
});
