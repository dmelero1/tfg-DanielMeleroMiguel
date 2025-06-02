# DMSPORT - Plataforma de Gestión Deportiva

**DMSport** es una aplicación web para la gestión de ejercicios, reservas de instalaciones deportivas y planificación de entrenamientos personales.
Desarrollada con **React Router 7.5**, **TypeScript**, **Express.js** y **MySQL**.

---

## Características Principales

- **Dashboard Interactivo**: Carrusel de entrenadores y navegación rápida.
- **Gestión de Ejercicios**: Catálogo con detalles, beneficios e instrucciones.
- **Reserva de Instalaciones**: Sistema de reservas para espacios deportivos.
- **Perfil de Usuario**: Calendario semanal y edición de información personal.
- **Autenticación**: Inicio de sesión seguro con MySQL y localStorage.
---

## Stack Tecnológico

### Frontend

- **React** 19.0.0  
- **React Router** 7.5.0  
- **TypeScript** 5.8.3  
- **Tailwind CSS** 4.0.0  
- **Swiper** 11.2.6  
- **React Icons** 5.5.0  

### Backend

- **Express.js** 5.1.0  
- **MySQL2** 3.14.0  
- **CORS** 2.8.5  

### Herramientas de Desarrollo

- **Vite** 5.4.11  
- **React Router DevTools** 1.1.0  

---

## Instalación

### Prerrequisitos

- Node.js (versión 20 o superior)  
- MySQL Server  
- npm  

### Configuración

1. **Clona el repositorio**

```bash
git clone https://github.com/dmelero1/tfg-DanielMeleroMiguel.git
cd tfg-DanielMeleroMiguel
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura la base de datos MySQL**

- Crea una base de datos llamada `dmsport`
- Añade las tablas necesarias: `users`, `exercises`, `calendar_assignments`
- Configura la conexión en `app/backend/index.js`

4. **Inicia el backend**

```bash
cd .\app\backend\
node index.js
```

5. **Inicia el frontend**

```bash
npm run dev
```

---

## Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Servidor de desarrollo en puerto 5173
```

---

## Arquitectura

### Rutas del Cliente

- `/` → Login (Layout público)  
- `/dashboard` → Panel principal  
- `/exercises` → Catálogo de ejercicios  
- `/exercises/:id` → Detalle de ejercicio  
- `/instalaciones` → Reservas  
- `/profile` → Perfil y calendario  

### API Endpoints (Backend)

- `POST /users` → Autenticación  
- `GET /exercises` → Lista de ejercicios  
- `GET /exercises/:id` → Detalle de ejercicio  
- `PUT /update-user` → Actualizar datos de usuario  
- `GET /api/calendar/:userId` → Obtener calendario  
- `POST /api/calendar` → Crear evento  
- `DELETE /api/calendar/:id` → Eliminar evento  

---

## Funcionalidades

### Dashboard
- Grid de nuestras ventajas
- Carrusel de entrenadores
- Navegación rápida

### Gestión de Ejercicios
- Catálogo filtrable
- Detalles, beneficios e imágenes

### Reserva Instalaciones
- Reserva en pistas de padel y tenis
- Gestion de horas ocupadas, número personas, extras...

### Perfil de Usuario
- Datos editables
- Roles diferenciados (admin/user)
- Calendario semanal

### Autenticación
- Login seguro con MySQL
- localStorage para persistencia
- Rutas protegidas por roles

---

## 🔧 Configuración de Desarrollo

- React Router 7.5 con SSR  
- Hot Module Replacement (HMR)  
- TypeScript por defecto  
- Estructura modular con layouts públicos y privados  

---

## Responsive Design

Diseño adaptativo con Tailwind CSS:

- Mobile-first  
- Breakpoints optimizados  
- Componentes fluidos  

---

## Licencia

Este proyecto forma parte del TRABAJO FINAL DE CICLO CFGS DESARROLLO DE APLICACIONES WEB de **Daniel Melero Miguel**.  

Desarrollado por **Daniel Melero Miguel**.