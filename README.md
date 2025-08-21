# 📚 MyLibrary — Modern Book Collection App

A visually stunning, full-stack web application where users and admins can browse, add, and manage books.  
Enjoy a pro-level UI with authentication, personalized shelves, and admin features.

---

## 🚀 Features
- **Authentication**: User registration, login, secure sessions, persistent user state.  
- **Beautiful UI**: Fully responsive, glassmorphic cards, beautiful gradients, animated interactions.  
- **Book Browsing**: View all books on the home screen as modern interactive cards.  
- **Personal Bookshelf**: Logged-in users can curate their own “My Books” shelf, update status/rating.  
- **Add Books**: Both regular users and admins can add new books.  
- **Role Management**: Admin and registered user logic, role-protected routes.  
- **Admin Powers** *(Optional/Future)*: Admins can manage and delete books or users.  

---

## 🛠️ Tech Stack
- **Frontend**: React, Vite, React Router, Tailwind CSS, Framer Motion (animations), Heroicons  
- **State Management**: React Context (AuthContext, BooksContext)  
- **Backend**: Node.js, Express, MongoDB Atlas (Mongoose)  
- **Authentication**: JWT (HttpOnly cookies), password hashing (bcryptjs)  
- **API**: RESTful endpoints for all features  
- **Deployment Ready**: Suitable for Vercel (frontend) and Render (backend)  

---

## 🖥️ Preview
**Live Demo:** https://books-library-management-app-delta.vercel.app/

---

## ✨ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/RAJATKUMARSINGH527/Books-Library-Management-App.git
cd Books-Library-Management-App
```

### 2. Install dependencies

Frontend (React Vite app):

```bash
cd FrontEnd
npm install
```

For backend (Node/Express API):

```bash
cd BackEnd
npm install
```

### 3. Environment setup
Create a .env in your backend with:

```bash
PORT=8000
MONGODB_URL=your-mongodb-uri
JWT_SECRET_KEY=your-super-secret-key
CLIENT_URL=http://localhost:3000
```

### 4. Start servers
Backend (on port 8000):

```bash
cd BackEnd
npm run server
# or
node index.js
```

Frontend (on port 5173):

```bash
cd Frontend
npm run dev
```

## 🔑 User Roles

### 👤 Registered User
- Can browse all books  
- Can add books  
- Has their own bookshelf  
  - Can set reading status  
  - Can rate books  

### 👑 Admin
- Has all **Registered User** permissions  
- (Optionally) Can manage/delete any book or user  
- Access to **future admin-only pages**  


***🗂️Project Structure***
```bash
/Books-Library-Management-App
  /FrontEnd                # React app source
    /src
      /components
      /contexts
      /pages
      App.jsx
      main.jsx
    index.html
    tailwind.config.js
    ...
  /BackEnd                 # Express API source
    /models
    /routes
    /middleware
    index.js
    ...
  README.md
```



## 📦 API Endpoints Overview

| Method | Endpoint                        | Description                               | Auth Required | Role        |
|--------|----------------------------------|-------------------------------------------|---------------|-------------|
| POST   | `/api/auth/register`             | Register a new user                        | ❌ No         | Public      |
| POST   | `/api/auth/login`                | Login                                      | ❌ No         | Public      |
| GET    | `/api/auth/me`                   | Get current user info by token/cookie      | ✅ Yes        | User/Admin  |
| GET    | `/api/books`                     | Get all books                              | ❌ No         | Public      |
| POST   | `/api/books`                     | Add a new book                             | ✅ Yes        | User/Admin  |
| GET    | `/api/mybooks`                   | Get user's bookshelf                       | ✅ Yes        | User/Admin  |
| PATCH  | `/api/mybooks/:bookId/status`    | Update reading status of a book            | ✅ Yes        | User/Admin  |
| PATCH  | `/api/mybooks/:bookId/rating`    | Set rating for a book                      | ✅ Yes        | User/Admin  |
| DELETE | `/api/books/:id` *(optional)*    | Delete a book                              | ✅ Yes        | Admin only  |
| GET    | `/api/admin/users` *(optional)*  | Get all users                              | ✅ Yes        | Admin only  |


## 💎 UI/UX Highlights

- Sticky navbar  
- Animated gradients  
- Card-based responsive grid  
- Glassmorphism & soft shadows  
- Animated interactions (buttons/cards lift and glow on hover)  
- Mobile-first and pixel-perfect alignment  
- Dark mode *(optional)*  


## 🧑💻 How to Contribute

1. Fork this repo & clone it.  

```bash
# Click "Fork" on the top right of the GitHub repo
# Then clone your fork locally
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

2. Create a new branch:  

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
# Stage all modified files (or specify paths instead of '.')
git add .

# Commit with a clear message
git commit -m "feat: add book card UI and rating control"
```

4. Push your changes to your branch.

```bash
# If you created the branch earlier (e.g., feature/your-feature)
# This sets the upstream so future 'git push' works without extra args
git push -u origin feature/your-feature
```

5. Open a Pull Request (PR) on GitHub (using the browser)

```bash
👉 Follow these steps:

1. Go to your repository on GitHub  
   🔗 Example: [https://github.com/<your-username>/<your-repo>](https://github.com/<your-username>/<your-repo>)  

2. Navigate to the **Pull Requests** tab  

3. Click on the 🟩 **New Pull Request** button  

4. Select branches:  
   - **base:** `main` (or the branch you want to merge into)  
   - **compare:** `feature/your-feature` (your branch)  

5. ✍️ Add a clear **title** and **description** for your PR  

6. 🚀 Click **Create Pull Request**
```

## 📝 Credits

- 🎨 UI inspiration: **Dribbble** & **Mobbin**  
- 📚 Book cover icons: **Heroicons**, **Flaticon**  
- 🛠️ Libraries used: **Tailwind CSS**, **Framer Motion**, **react-icons**  


## 📧 Contact

Made with 💜 by **[Rajat Kumar Singh]**

- 📩 **Email:** [rajatkumarsingh257@gmail.com](mailto:rajatkumarsingh257@gmail.com)  
- 🔗 **LinkedIn:** [Your LinkedIn Profile](www.linkedin.com/in/rajat-kumar-singh-574650208)  
