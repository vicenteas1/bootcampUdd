# 🐾 Reto: Gestión de Animales y Perros (POO en JavaScript)

Crea un programa en JavaScript que modele animales utilizando clases y herencia.  
Implementa una clase base `Animal` y una clase hija `Perro` que amplíe sus funcionalidades.

---

## 🧠 Objetivo

Desarrollar un sistema que permita:

- Crear animales con nombre y edad
- Crear perros que además tengan una raza
- Acceder y modificar atributos mediante getters y setters
- Hacer que los perros "ladren" con un método especial
- Mostrar toda la información con `toString()`

Cada objeto debe tener:

- `nombre` (string)
- `edad` (number)
- `raza` (string, sólo para perros)

---

## ⚙️ Requisitos Técnicos

Implementar las siguientes clases y métodos:

### ✅ `Animal`
- **Atributos:** `nombre`, `edad`
- **Métodos:**
  - `getNombre()`: Devuelve el nombre
  - `setNombre(nombre)`: Modifica el nombre (validando tipo)
  - `getEdad()`: Devuelve la edad
  - `setEdad(edad)`: Modifica la edad (validando tipo)
  - `toString()`: Devuelve una cadena con el nombre y edad

### ✅ `Perro` (Extiende de `Animal`)
- **Atributos adicionales:** `raza`
- **Métodos:**
  - `getRaza()`: Devuelve la raza
  - `setRaza(raza)`: Modifica la raza (validando tipo)
  - `ladrar()`: Devuelve un mensaje simulando un ladrido
  - `toString()`: Devuelve una cadena con nombre, edad y raza

---

## 📂 Estructura del Proyecto


---

## 🛠️ Cómo probarlo

1. Instala una extensión como **Live Server** o usa un servidor local.
2. Abre el archivo `index.html` en el navegador.
3. Observa los resultados en la consola (`F12` o `Ctrl + Shift + I`).

---

## 🔥 Ejemplo de Uso

```javascript
import Perro from './js/perroClass.js';

const perro = new Perro('Fox', 15, 'Fox Terrier');

perro.toString()|;
// Salida: nombre: Fox, edad: 15, raza: Fox Terrier

perro.ladrar()|;
// Salida: nombre: Fox, ladra guau guau
