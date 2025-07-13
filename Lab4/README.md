# API de Reservas de Hotel 🏨

Este proyecto es una API REST desarrollada con **Express + TypeScript**, diseñada para gestionar reservas de hotel. Incluye validaciones, filtrado avanzado y documentación con Swagger UI.

---

## Tecnologías usadas

- Node.js
- TypeScript
- Express
- express-validator
- Swagger (OpenAPI)
- Winston (logging)
- tsx (dev server)
- YAML (para Swagger)

---

## Estructura del proyecto

```
src/
└── app/
    ├── controller/         # Controladores (lógica de endpoints)
    ├── routes/             # Definición de rutas
    ├── services/           # Lógica de negocio (servicios)
    ├── models/             # Modelos de datos
    ├── middleware/         # Validaciones y middlewares
    ├── utils/              # Funciones utilitarias
    ├── config/             # Configuración (logger, swagger.yaml)
    └── main.ts             # Punto de entrada principal
```

---

## Instalación

```bash
# Clonar el repositorio
git clone <REPO_URL>

# Instalar dependencias
npm install
```

---

## Scripts disponibles

| Comando        | Descripción                                   |
|----------------|-----------------------------------------------|
| `npm run dev`  | Servidor en modo desarrollo (`tsx`)           |
| `npm run build`| Compila los archivos TypeScript en `/dist`    |
| `npm start`    | Ejecuta el proyecto desde `/dist`             |
| `npm run rbs`  | Limpia, compila y ejecuta el proyecto         |

> Si usas `rbs`, asegúrate de que `swagger.yaml` se copie a `dist/app/config/`.
> (Fix) Actualmente el comando npm start ya lo hace.

---

## Documentación Swagger

La API está documentada con Swagger.

Una vez corras el servidor, puedes acceder a:

```
http://localhost:3000/api-docs
```

---

## Endpoints principales

| Método | Ruta               | Descripción                          |
|--------|--------------------|--------------------------------------|
| GET    | `/reservas`        | Obtener o filtrar reservas           |
| GET    | `/reservas/:id`    | Obtener una reserva por ID           |
| POST   | `/reservas`        | Crear una nueva reserva              |
| PUT    | `/reservas/:id`    | Actualizar una reserva existente     |
| DELETE | `/reservas/:id`    | Eliminar una reserva                 |

---

## Ejemplo de modelo `Reserva`

```json
{
  "id": "uuid",
  "hotel": "Hotel Ejemplo",
  "fechaInicio": "2025-12-25",
  "fechaFin": "2025-12-30",
  "tipoHabitacion": "suite",
  "numHuespedes": 2,
  "estado": "pagado",
  "active": true
}
```

---

## Notas adicionales

- Swagger está basado en el archivo `swagger.yaml` dentro de `src/app/config`.
- Archivo .env debe contener PORT=<puerto> Y LOG_LEVEL=info para el funcionamiento

---

## Autor

Desarrollado por Vicente Saavedra Rojas
