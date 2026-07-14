# Mini Flota Web

Aplicación web desarrollada con **React y TypeScript** para la gestión
de vehículos y la asignación de conductores.

El frontend permite iniciar sesión, consultar la flota, registrar
vehículos y asignar conductores mediante una interfaz conectada con la
API de Mini Flota.

---

## Tecnologías utilizadas

-   React 18
-   TypeScript
-   Vite
-   TanStack Router
-   TanStack Query
-   React Hook Form
-   Zod
-   Axios
-   Tailwind CSS
-   Yarn

---

## Arquitectura

``` text
src/
├── components/
│   ├── RootLayout.tsx
│   └── ui/
├── features/
│   ├── auth/
│   ├── drivers/
│   └── vehicles/
├── lib/
│   └── api.ts
├── router.tsx
└── main.tsx
```

### Responsabilidad de cada sección

-   **components/ui:** componentes reutilizables.
-   **features/auth:** autenticación y validaciones.
-   **features/drivers:** tipos y peticiones de conductores.
-   **features/vehicles:** gestión de vehículos y asignación de
    conductores.
-   **lib/api.ts:** configuración centralizada de Axios.
-   **router.tsx:** navegación y protección de rutas.

---

## Requisitos

-   Node.js 18 o superior
-   Yarn
-   Git
-   Backend de Mini Flota en ejecución

Comprobar versiones:

``` bash
node -v
yarn -v
```

---

## Instalación

### 1. Clonar el repositorio

``` bash
git clone https://github.com/angelaandrango4-web/Mini-flota-web.git
cd Mini-flota-web
```

### 2. Instalar dependencias

``` bash
yarn install
```

### 3. Configurar variables de entorno

Crear un archivo `.env`:

``` env
VITE_API_URL=http://127.0.0.1:8000
```

> El archivo .env contiene variables de entorno propias de cada desarrollador y no debe subirse al repositorio

### 4. Ejecutar el backend

El backend debe estar disponible en:

``` text
http://127.0.0.1:8000
```

Repositorio:

``` text
https://github.com/angelaandrango4-web/Mini-Flota-api
```

### 5. Ejecutar el frontend

``` bash
yarn dev
```

Aplicación:

``` text
http://localhost:5173/login
```

---

## Comandos

``` bash
yarn dev
yarn build
yarn lint
yarn preview
```

---

## Funcionalidades

### Autenticación

-   Inicio de sesión con JWT.
-   Validación con React Hook Form + Zod.
-   Protección de rutas.
-   Cierre de sesión automático ante respuestas 401.

### Vehículos

-   Crear vehículos.
-   Listar vehículos.
-   Validaciones de formulario.
-   Actualización automática con TanStack Query.

### Conductores

-   Consultar conductores.
-   Asignar y cambiar conductor.
-   Mostrar únicamente conductores disponibles.
-   Actualización automática de la tabla.

---

## Decisiones técnicas

### Axios centralizado

Todas las peticiones utilizan una única instancia ubicada en:

``` text
src/lib/api.ts
```

-   La URL del backend se obtiene desde `VITE_API_URL`.
-   El token JWT se agrega automáticamente mediante un interceptor.
-   Ante un `401 Unauthorized`, el token se elimina y el usuario es
    redirigido a `/login`.
-   La petición `/auth/login` queda excluida para mostrar correctamente
    los errores de autenticación.

### TanStack Query

-   `useQuery` para obtener información.
-   `useMutation` para crear y actualizar recursos.
-   Invalidación automática de consultas tras operaciones exitosas.

### Organización por funcionalidades

Cada módulo (`auth`, `drivers`, `vehicles`) contiene sus propios tipos,
API y componentes.

### Conductores disponibles

La lista de conductores se consulta una sola vez desde la página
principal y se comparte con la tabla. El frontend oculta conductores
ocupados, mientras que el backend mantiene la validación definitiva.

---

## Manejo de errores

La aplicación informa al usuario cuando ocurre alguno de los siguientes
casos:

-   Credenciales incorrectas.
-   Error de conexión con el servidor.
-   Vehículo duplicado.
-   Datos inválidos.
-   Conductor ya asignado.
-   Error al cargar vehículos o conductores.

---

## Estado del proyecto

Proyecto desarrollado como parte de las prácticas preprofesionales.

Estado actual:

-  Autenticación implementada.
-  Rutas protegidas.
-  Gestión de vehículos.
-  Asignación de conductores.
-  Integración con el backend.
-  Compilación y linter verificados.

---
## Mejoras futuras

-   Gestión completa de conductores.
-   Historial de asignaciones.
-   Buscador y filtros.
-   Paginación.
-   Pruebas automatizadas.
-   Renovación automática del token.

---

## Flujo de contribución

1.  Actualizar la rama `qa`.
2.  Crear una rama `feat/...`.
3.  Desarrollar la funcionalidad.
4.  Realizar commits siguiendo Conventional Commits.
5.  Abrir un Pull Request hacia `qa`.
6.  Tras la aprobación, integrar `qa` en `main`.

Ejemplos:

``` text
feat: implementar asignación de conductores
fix: corregir validaciones
docs: actualizar README
refactor: mejorar experiencia de usuario
```

---

## Proyecto relacionado

Backend:

https://github.com/angelaandrango4-web/Mini-Flota-api

---

## Autor

Proyecto desarrollado por **Angela Andrango** como parte de sus
prácticas preprofesionales.
