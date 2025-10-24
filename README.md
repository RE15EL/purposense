# 🧩 Mini Theory of Change — A Technical Challenge (React + Tailwind)

## 🚀 Overview

This project implements the **"Mini Theory of Change"** interface, following the specifications outlined in the accompanying technical challenge. The goal is to build a dynamic, modular, and accessible view that captures and visualizes the following elements:

- **The reason we exist** — Textarea with a character counter (N/250) and helper text.
- **The people we serve** — Tag input with keyboard support (Enter, Backspace, ×).
- **Assumptions** — Editable table with full CRUD functionality, validations, and pagination.
- **Outcome Cards** — Four fixed-height cards with invisible internal scrolling:
  - _Programmes_ (read-only)
  - _Direct outcomes_ (accordion + CRUD)
  - _Indirect outcomes_ (editable list + internal scroll)
  - _Ultimate impact_ (editable list + internal scroll)
- **Save button** — Consolidates the local state and displays the resulting JSON structure.

## ✨ Key Features

- **Dynamic and Modular Interface**: A flexible and component-based UI.
- **Interactive Inputs**: Includes a textarea with a character counter, a tag input, and an editable table.
- **CRUD Functionality**: Full Create, Read, Update, and Delete operations on the "Assumptions" table.
- **State Management**: Centralized state management with Zustand.
- **Schema Validation**: Robust data validation using Zod.
- **Modern Tech Stack**: Built with Next.js, Shadcn UI, and Tailwind CSS.

## 🧱 Tech Stack

| Category          | Technology                                                   |
| ----------------- | ----------------------------------------------------------   |
| **Framework**     | [Next.js](https://nextjs.org/) 15.5.6                        |
| **UI Library**    | [Shadcn UI](https://ui.shadcn.com/)                          |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/) v4, [tw-animate-css](https://www.npmjs.com/package/tw-animate-css) |
| **Icons**         | [lucide-react](https://lucide.dev/)                          |
| **Utilities**     | `clsx`, `tailwind-merge`, `class-variance-authority`         |

## ⚙️ Installation

To get a local copy up and running, follow these simple steps.

1. **Clone the repository**
   ```bash
   git clone https://github.com/RE15EL/purposense.git
   cd purposense
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the code using ESLint.

## 📂 Project Structure

Here's an overview of the most important directories and files:

```
purposense/
├── public/              # Static assets
├── src/
│   ├── app/             # Main application files
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Customs hooks
│   └── lib/             # Utilities and helper functions
│   └── types/           # Utilities types and interfaces
├── package.json         # Project dependencies and scripts
```

## 🌍 Live Demo

The project is deployed in:  
👉 [https://purposense.vercel.app](https://purposense.vercel.app)
