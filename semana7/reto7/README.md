# 📚 Sistema de Biblioteca – Programación Orientada a Objetos (POO)

## 🧾 Descripción del Proyecto

Este proyecto implementa un sistema básico para la gestión de una biblioteca, diseñado con los principios fundamentales de la **Programación Orientada a Objetos (POO)**: **Encapsulamiento, Herencia, Abstracción y Polimorfismo**.

El objetivo principal es aplicar estos conceptos a través de un conjunto de clases que simulan el funcionamiento básico de una biblioteca.

---

## 🧱 Estructura del Sistema

### 🔸 Clase `Libro`
Representa un libro genérico con las siguientes propiedades:
- `titulo` (string)
- `autor` (string)
- `año` (number)
- `disponible` (boolean) – Indica si el libro está disponible para préstamo.

### 🔸 Clase `LibroInfantil` (hereda de `Libro`)
Extiende la clase `Libro` añadiendo:
- `edadMinima` (number) – Edad mínima recomendada para leer el libro.

### 🔸 Clase `Biblioteca`
Encapsula una lista de libros y proporciona los siguientes métodos:
- `agregarLibro(libro: Libro)`: Añade un nuevo libro a la biblioteca.
- `buscarPorTitulo(titulo: string)`: Devuelve una lista de libros cuyo título coincide con el buscado.
- `prestarLibro(titulo: string)`: Si el libro está disponible, cambia su estado y devuelve un mensaje de confirmación. Si no, informa que no está disponible.

---

## ⚙️ Ejecución y Pruebas

1. Crea una instancia de la clase `Biblioteca`.
2. Añade varias instancias de `Libro` y `LibroInfantil`.
3. Utiliza los métodos:
   - `agregarLibro()`
   - `buscarPorTitulo()`
   - `prestarLibro()`
4. Observa cómo se aplican los conceptos de POO en la interacción entre clases.

---

## 💡 Conceptos de POO Aplicados

- **Encapsulamiento**: Las propiedades de cada clase están bien definidas y sus valores se manipulan mediante métodos específicos.
- **Herencia**: La clase `LibroInfantil` hereda de `Libro` para reutilizar y extender su funcionalidad.
- **Abstracción**: Se ocultan los detalles internos de cómo se maneja la lista de libros dentro de `Biblioteca`.
- **Polimorfismo**: Se pueden manejar instancias de `Libro` y `LibroInfantil` de manera uniforme dentro de la biblioteca.

---

## 🛠️ Tecnologías

- Lenguaje: JavaScript (o TypeScript, según el entorno del curso)
- Paradigma: Programación Orientada a Objetos

---

## 📎 Ejemplo de Código (Resumen)

```js
const biblioteca = new Biblioteca();

const libro1 = new Libro("Cien Años de Soledad", "Gabriel García Márquez", 1967, true);
const libroInfantil1 = new LibroInfantil("Harry Potter", "J.K. Rowling", 1997, true, 8);

biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libroInfantil1);

console.log(biblioteca.buscarPorTitulo("Harry Potter"));
console.log(biblioteca.prestarLibro("Harry Potter"));
console.log(biblioteca.prestarLibro("Harry Potter")); // Debería indicar que ya no está disponible
