Biblioteca Personal (Frontend)
==============================

Aplicación web para la gestión de tu biblioteca personal, con autenticación de usuarios y rutas protegidas. Construida con **React**, **Vite** y **React Router DOM**.

Funcionalidades principales
---------------------------

*   **Autenticación JWT**: Registro, login y gestión segura de sesiones.
    
*   **Gestión de libros**:
    
    *   Crear nuevos libros (título, autor, género, año).
        
    *   Visualizar listado personal.
        
    *   Actualizar estado de lectura (leído / no leído).
        
    *   Eliminar libros.
        
*   **Perfil de usuario**:
    
    *   Ver y editar información personal.
        
    *   Cambiar contraseña.
        
*   **Rutas protegidas**: Solo usuarios autenticados pueden acceder a Dashboard, Mis Libros y Ajustes.
    
*   **Notificaciones toast**: Mensajes flotantes para informar sobre acciones realizadas.
    
*   **Validación de formularios**: Indicadores visuales para errores y campos requeridos.
    
*   **Estilos responsive**: Paleta de colores y diseño personalizable en `src/index.css`.
    

Requisitos
----------

*   Node.js >= 18.x
    
*   npm >= 7.x
    
*   Backend funcional (por defecto en `http://localhost:4000/api`)
    

Variables de entorno
--------------------

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

`VITE_API_BASE_URL=http://localhost:4000/api`

Ajusta según tu entorno.

Instalación
-----------

1.  Clona el repositorio y accede a la carpeta del proyecto:
        
    `git clone <url-del-repo-frontend> cd frontend-project-folder`
    
2.  Instala las dependencias:
    
    `npm install`
    

Scripts disponibles
-------------------

*   `npm run dev` – Inicia la aplicación en modo desarrollo (Vite).
    
*   `npm run build` – Genera la build de producción.
    
*   `npm run preview` – Previsualiza localmente la build de producción.
    
*   `npm run lint` – Ejecuta ESLint para análisis de código.
    

Estructura principal
--------------------

*   `src/pages/` – Vistas principales (Home, Login, Register, Dashboard, MyBooks, Ajustes).
    
*   `src/components/` – Componentes reutilizables (Layout, Header, Footer, Toast).
    
*   `src/context/authContext.jsx` – Contexto global de autenticación.
    
*   `src/context/toastContext.jsx` – Contexto global para notificaciones.
    
*   `src/services/api.js` – Funciones para interacción con el backend.
    
*   `src/router/RouterApp.jsx` – Definición y protección de rutas.
    
*   `src/index.css` – Estilos globales y paleta de colores.
    

Uso
---

1.  Asegúrate de que tu backend esté corriendo en la URL definida en `VITE_API_BASE_URL`.
    
2.  Inicia la aplicación frontend:
    
    `npm run dev`
    
3.  Accede a `http://localhost:5173` (o el puerto configurado por Vite) en tu navegador.
    
4.  Regístrate o inicia sesión para empezar a gestionar tu biblioteca personal.
    

Créditos
--------

Desarrollado por Martin Rodriguez.
Powered by Pepito.