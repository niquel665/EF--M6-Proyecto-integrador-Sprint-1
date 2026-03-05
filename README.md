# EF--M6-Proyecto-integrador-Sprint-1
Proyecto: "KanbanPro" - Kick-off del Sprint 1

Prototipo web renderizado desde servidor para validar navegación, UI y persistencia local.
Permite visualizar un tablero Kanban desde un archivo `data.json` y agregar nuevas tareas que quedan guardadas.

## ✅ Funcionalidades (Sprint 1)
- **Navegación**
  - `GET /` → Home
  - `GET /register` → Registro (mock)
  - `GET /login` → Login (mock)
- **Dashboard con datos persistentes**
  - `GET /dashboard` lee `data.json` con `fs.readFileSync`, hace `JSON.parse` y renderiza dinámicamente con Handlebars.
- **Agregar tareas con persistencia**
  - Formulario en el dashboard envía `POST /nueva-tarjeta`
  - Ciclo: **Leer → Modificar → Escribir** (`fs.writeFileSync` + `JSON.stringify`)
  - Redirige a `/dashboard` para ver la tarea agregada

## 🧰 Tecnologías
- Node.js
- Express
- Handlebars (hbs)
- File System (fs) + JSON local (`data.json`)
- Bootstrap (uso híbrido para layout) + CSS propio (tema violeta/glass)

## 📁 Estructura del proyecto
`/public
`styles.css
`/views
`home.hbs
`login.hbs
`register.hbs
`dashboard.hbs
`/partials
`layout.hbs
`app.js
`data.json
`package.json

## ▶️ Cómo ejecutar el proyecto
1) Instalar dependencias:
2) 
npm install

3) Levantar el servidor:

npm run dev

3) Abrir en el navegador:

Home: http://localhost:3000/

Dashboard: http://localhost:3000/dashboard
