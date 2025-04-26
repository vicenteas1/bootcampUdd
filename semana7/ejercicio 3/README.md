# 🚗 Proyecto: Gestión de Vehículos (POO en JavaScript)

Este proyecto implementa una clase `Vehiculo` en JavaScript para modelar automóviles usando conceptos de **Programación Orientada a Objetos (POO)**.

Permite crear vehículos con sus atributos principales y controlar su estado (arrancado o detenido) de forma segura mediante validaciones.

---

## 🧠 Objetivo

Desarrollar un sistema que permita:

- Crear un vehículo indicando su marca, modelo, año y estado inicial.
- Acceder y modificar atributos de manera controlada con getters y setters.
- Cambiar el estado del vehículo (`en marcha` o `detenido`) mediante métodos específicos.
- Validar el cambio de estado para evitar inconsistencias.
- Responder las acciones usando una estructura tipo `ApiResponse`.

---

## ⚙️ Características principales

### ✅ Atributos de la clase `Vehiculo`
- `marca` (string)
- `modelo` (string)
- `anio` (number)
- `estado` (number: `0` = detenido, `1` = en marcha)

### ✅ Métodos públicos

- `getMarca()`, `setMarca(marca)`
- `getModelo()`, `setModelo(modelo)`
- `getAnio()`, `setAnio(anio)`
- `getEstado()`, `setEstado(estado)`
- `toString()`: Devuelve una representación de marca, modelo y año.

### ✅ Métodos de acción
- `arrancar()`: Cambia el estado del vehículo a `en marcha` (1).
- `detener()`: Cambia el estado del vehículo a `detenido` (0).
- `validarEstado(estado)`: Verifica si el estado es válido para cambiar.

### ✅ Respuesta estándar
Cada acción retorna una respuesta estandarizada usando la clase `ApiResponse`, indicando:
- `message` (mensaje de éxito o error)
- `data` (información relacionada)
- `statusCode` (código de estado)

---

## 📂 Estructura del proyecto

