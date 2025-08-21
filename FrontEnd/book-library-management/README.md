# 📚 Books Library Management App – Frontend

This is the **frontend** of the Books Library Management App, built with **React (Vite)**.  
It provides a user-friendly UI for authentication, browsing books, and tracking personal reading.

---

## 🚀 Tech Stack

- React (Vite)
- Tailwind CSS (utility-first CSS framework)
- Axios (API requests)
- Framer Motion (animations & transitions)
- React Router
- Heroicons / react-icons (iconography)
- Context API (or Redux)

---

## ✅ Prerequisites

- Node.js v16+ (v18+ recommended)  
- npm (or pnpm / yarn)

---

## ⚙️ Setup Instructions

1. **Clone the repo & go to frontend**
```bash
git clone https://github.com/<your-username>/Books-Library-Management-App.git
cd Books-Library-Management-App/frontend
```
***2. Install dependencies***

npm install


***3. Configure environment variables***

Create a `.env` file at `frontend/.env` with the Vite-style variable name:

```bash
VITE_API_URL=http://localhost:8000/api
```

Use the deployed backend URL when you deploy the frontend (set this in Vercel/Netlify environment variables).

***4. Start the development server***

```bash
npm run dev
```


Open: `http://localhost:5173` (Vite default).

***5. Build for production***

```bash
npm run build
npm run preview      # preview production build locally
```

***📦 Project Structure (recommended)***

```bash
frontend/
├── public/
├── src/
│   ├── components/     # reusable UI components (Navbar, BookCard, etc.)
│   ├── pages/          # page-level views (Home, Login, MyBooks, AddBook)
│   ├── contexts/       # AuthContext, BooksContext
│   ├── services/       # axios instances, API helpers
│   ├── styles/         # Tailwind/custom styles (optional)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── tailwind.config.js
```

***🧩 API integration (example)***

Create a central axios instance that uses the VITE_API_URL and sends credentials (if your backend uses HttpOnly cookies):

```js
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // required if backend sets HttpOnly cookies
});

export default api;
```

***Login example***

```js
// example usage inside an async function
const { data } = await api.post('/auth/login', { email, password });
// If backend sets HttpOnly cookie, token handling is done server-side and you don't store token in localStorage.
```

***🔐 Auth & Security notes***

- Prefer HttpOnly cookies for JWTs in production (reduces XSS risk).

- If you use cookies, set `withCredentials: true` in your axios instance and enable credentials in backend CORS (`credentials: true` + `origin` set to frontend URL).

- If you choose token-in-storage, make sure to handle token refresh & secure storage policies.

***🖼️ UI / UX Highlights (frontend-specific)***

- Animated gradient backgrounds and glassmorphism cards

- Responsive sticky navbar with shadow and gradient

- Delightful hover/focus effects and Framer Motion transitions

- Light + dark theme ready (if implemented)

- Mobile-first design

***🌍 Deployment***

- ***Vercel / Netlify*** are recommended for the frontend.

- When deploying, set the environment variable `VITE_API_URL` to your backend’s production API (e.g., `https://api.mybooks.app/api`).

- Ensure backend CORS allows the frontend origin and credentials (if using cookies).

***🧪 Useful Scripts (package.json)***

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```
***🧑‍💻Contribution & Links***

- For contribution guidelines, see the root README.md.

- The frontend should call backend endpoints documented in /backend/README.md.

***📜License***

RajatKumarSingh License © 2025