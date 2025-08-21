# 📚 Books Library Management App – Backend

This is the **backend** of the Books Library Management App, built with **Node.js, Express, and MongoDB**.  
It provides authentication, book management, and REST APIs for the frontend.

---

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT (HttpOnly cookies recommended)
- bcryptjs

---

## ✅ Prerequisites
- Node.js ≥ 18
- A MongoDB connection string (Atlas or local)

---

## ⚙️ Setup Instructions

1) **Clone the repo & go to backend**
```bash
git clone https://github.com/your-username/books-library-management-app.git
cd books-library-management-app/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file:
   Use the same variable names you used across the project for consistency.
```bash
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
CLIENT_URL=http://localhost:5173
```


4. Run the server:

```bash
# If you have a dev script (e.g., nodemon)
npm run dev

# Or directly with Node
node index.js
```

**📦 API Endpoints**

**🔑 Auth Routes***

- POST /api/auth/register → Register a new user

- POST /api/auth/login → Login user & return token (and/or set HttpOnly cookie)

- GET /api/auth/me → Get current user (requires auth)

***📚 Book Routes***

- GET /api/books → Get all books (public)

- POST /api/books → Add new book (requires auth)

- PUT /api/books/:id → Update a book (requires auth)

- DELETE /api/books/:id → Delete a book (requires auth / admin as per your policy)

***📖 My Books (Shelf) Routes***

- GET /api/mybooks → Get logged-in user’s bookshelf (requires auth)

- PATCH /api/mybooks/:bookId/status → Update reading status (requires auth)

- PATCH /api/mybooks/:bookId/rating → Set rating (requires auth)

- If admin-only behavior is desired (e.g., deleting any book/users), protect with role middleware.

**🧪Sample Requests**

***Register***

```http
POST /api/auth/register
Content-Type: application/json
```

***Body***

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "mypassword123"
}
```
***Login***

```http
POST /api/auth/login
Content-Type: application/json
```

***Body***

```json
{
  "email": "john@example.com",
  "password": "mypassword123"
}
```

***Get All Books***

```http
GET /api/books
```

***Add a Book (requires JWT)***

```http
POST /api/books
Content-Type: application/json
Authorization: Bearer <JWT>
```

**Body**
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "coverUrl": "https://example.com/cover.png",
  "description": "Tiny changes, remarkable results."
}
```

**🗂️ Project Structure (backend)**

```bash
backend/
├── models/
├── routes/
├── middleware/
├── controllers/        # if you separate controllers
├── index.js
├── package.json
└── README.md
```

**📝 Notes**

- Ensure CORS is configured to allow CLIENT_URL during development.

- Prefer HttpOnly cookies for JWT in production to reduce XSS risk.

- Use environment variables for secrets and connection strings.

**📜 License**

RajatKumarSingh © 2025