# 📚 Proyecto: Gestión de Productos y Libros (POO en JavaScript)

Este proyecto demuestra cómo crear clases en JavaScript usando **herencia** para modelar un catálogo de productos, incluyendo una especialización para **libros**.

Incluye:
- Una clase base `Producto`
- Una clase hija `Libro` que hereda de `Producto`
- Métodos para manipular atributos y mostrar resúmenes

---

## 🧠 Objetivo

Desarrollar un sistema que permita:

- Crear productos generales con nombre y precio.
- Crear libros que además de nombre y precio tengan autor.
- Utilizar getters y setters para controlar cambios.
- Generar resúmenes de información de los libros.

Cada objeto debe tener:

- `nombre` (string)
- `precio` (number)
- `autor` (string) → (solo para libros)

---

## ⚙️ Características principales

### ✅ Clase `Producto`
- **Atributos:**
  - `nombre`
  - `precio`
- **Métodos:**
  - `getNombre()`, `setNombre(nombre)`
  - `getPrecio()`, `setPrecio(precio)`
  - `toString()`: Devuelve un resumen del producto.

### ✅ Clase `Libro` (Extiende de `Producto`)
- **Atributos adicionales:**
  - `autor`
- **Métodos:**
  - `getAutor()`, `setAutor(autor)`
  - `resumen()`: Devuelve un resumen completo con nombre, precio y autor.

---

## 🛠️ Cómo probarlo

1. Abre `index.html` en tu navegador usando un servidor local (por ejemplo **Live Server** en VSCode).
2. El objeto `Libro` ya está disponible en la consola (`window.Libro`).

---

## 🔥 Ejemplo de uso en consola

```javascript
// Crear un nuevo libro
const libro1 = new Libro('Don Quijote de la Mancha', 10000, 'Miguel de Cervantes');

// Ver resumen del libro
console.log(libro1.resumen());
// 'nombre: Don Quijote de la Mancha, precio: 10000, autor: Miguel de Cervantes'
