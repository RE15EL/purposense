# 🧩 Mini Theory of Change — Technical Challenge (React + Tailwind)

## 🚀 Overview

Este proyecto implementa la interfaz **"Mini Theory of Change"** siguiendo las especificaciones descritas en el reto técnico adjunto.  
El objetivo es construir una vista dinámica, modular y accesible que permita capturar y visualizar los siguientes elementos:

- **The reason we exist** — Textarea con contador (N/250) y helper text.
- **The people we serve** — Tag input con soporte de teclado (Enter, Backspace, ×).
- **Assumptions** — Tabla editable con CRUD completo, validaciones y paginación.
- **Outcome Cards** — Cuatro tarjetas de altura fija con scroll interno invisible:
  - _Programmes_ (solo lectura)
  - _Direct outcomes_ (accordion + CRUD)
  - _Indirect outcomes_ (lista editable + scroll interno)
  - _Ultimate impact_ (lista editable + scroll interno)
- **Save button** — Consolida el estado local y muestra la estructura JSON resultante.

## 🧱 Tech Stack

| Layer             | Technology                                                 |
| ----------------- | ---------------------------------------------------------- |
| Framework         | **Next.js 15.5.6**                                         |
| UI Library        | **Shadcn UI**                                              |
| Styling           | **Tailwind CSS v4**, **tw-animate-css**                    |
| Icons             | **lucide-react**                                           |
| State Management  | **Zustand 5.0.8**                                          |
| Schema Validation | **Zod 4.1.12**                                             |
| Utilities         | **clsx**, **tailwind-merge**, **class-variance-authority** |

## ⚙️ Installation

```bash
# 1. Clona el repositorio
git clone https://github.com/RE15EL/purposense.git
cd purposense

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev

# 4. Abre el navegador
http://localhost:3000
```
