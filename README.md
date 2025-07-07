# Todo App (React + Vite)

Aplicación web para gestión de tareas con autenticación, reconocimiento de voz y rutas protegidas. Construida con React, Vite y React Router DOM.

## Requisitos previos
- Node.js >= 16.x
- npm >= 7.x
- Backend compatible (por defecto espera en `http://localhost:2222/api/tasks`)

## Instalación

1. Clona el repositorio y entra en la carpeta del proyecto:
   ```bash
   git clone <url-del-repo>
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Scripts disponibles
- `npm run dev`: Inicia la app en modo desarrollo (Vite)
- `npm run build`: Genera la build de producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta ESLint para análisis de código

## Variables de entorno
Puedes configurar las siguientes variables en un archivo `.env`:
- `VITE_NODE_DEV` ("development" o "production")
- `VITE_BASE_API_URL` (URL del backend en producción)

## Estructura principal
- `src/pages/`: Vistas principales (`Home`, `Login`, `Register`, `Dashboard`, `Ajustes`)
- `src/components/`: Componentes reutilizables y de layout
- `src/context/authContext.jsx`: Contexto global de autenticación (JWT)
- `src/hooks/useTasks.js`: Hook para gestión de tareas y reconocimiento de voz
- `src/services/api.js`: Lógica de comunicación con el backend
- `src/router/RouterApp.jsx`: Definición de rutas y protección de rutas privadas

## Funcionalidades destacadas
- **Autenticación JWT**: Registro e inicio de sesión. El token se almacena en localStorage y se usa para proteger rutas y consumir la API.
- **Gestión de tareas**: Crear, completar y eliminar tareas. Las tareas se obtienen del backend.
- **Reconocimiento de voz**: Puedes agregar tareas usando el micrófono (SpeechRecognition API, botón "Grabar").
- **Rutas protegidas**: Solo usuarios autenticados pueden acceder a Home y Dashboard.
- **Estilos**: CSS sencillo y responsivo en `src/index.css`.

## Uso
1. Asegúrate de que el backend esté corriendo en la URL esperada.
2. Inicia la app:
   ```bash
   npm run dev
   ```
3. Accede a `http://localhost:5173` en tu navegador.
4. Regístrate o inicia sesión para comenzar a gestionar tus tareas.

## Créditos
Desarrollado por Pepito.
