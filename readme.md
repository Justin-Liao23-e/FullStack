# MyProject - Full Instructions & Complete Directory

---

## Directory Structure

Below is the **complete directory layout** for this project. Everything resides inside a main folder called `myproject/`.

```
myproject/
├── README_FULL_INSTRUCTIONS.txt       <-- This file (the one you are reading)
│
├── backend/
│   ├── manage.py                      <-- Django's command-line utility script
│   ├── requirements.txt               <-- Python dependencies (if separate)
│   ├── myproject/
│   │   ├── __init__.py
│   │   ├── settings.py                <-- Django settings (db config, installed apps, etc.)
│   │   ├── urls.py                    <-- Main URL routing for the Django project
│   │   ├── wsgi.py                    <-- WSGI config for production servers
│   └── myapp/
│       ├── __init__.py
│       ├── admin.py                   <-- Registers models with Django admin site
│       ├── apps.py                    <-- App config
│       ├── migrations/
│       │   └── __init__.py            <-- Empty, so Django sees this folder for migrations
│       ├── models.py                  <-- Database models (e.g., Post)
│       ├── serializers.py             <-- Converting model instances <-> JSON
│       ├── urls.py                    <-- URL patterns for `myapp`
│       └── views.py                   <-- The logic handling requests (login, register, posts, admin, etc.)
│
└── frontend/
   ├── package.json                   <-- Node dependencies
   ├── public/
   │   └── index.html                 <-- Base HTML for the React app
   └── src/
      ├── App.js                     <-- Top-level React component, handles routes
      ├── App.css                    <-- Basic CSS styling
      ├── index.js                   <-- Entry point; renders App to the page
      ├── services/
      │   └── api.js                 <-- Helper for making fetch requests to the backend
      └── components/
         ├── Navbar.js              <-- Navigation bar
         ├── Login.js               <-- Login form
         ├── Register.js            <-- Registration form
         ├── Home.js                <-- User's home (showing posts, etc.)
         ├── PostForm.js            <-- Form to create/edit a post
         └── AdminPanel.js          <-- Admin-only panel for managing users and posts
```

---

## 1. Overview

This project is a **full-stack web application** with the following features:

- Users can register (email, password, first name, last name, and username).
- Users can log in/out.
- Users can create, edit, or delete "Posts" (like personal notes).
- Users can delete their own account.
- A "hardcoded admin" can:
  - View all users.
  - Delete any user.
  - Remove any post.

---

## 2. Tech Stack

- **Backend**: Django (Python) + Django REST Framework
- **Frontend**: React (JavaScript)
- **Database**: SQLite (default in Django)

---

## 3. Backend Setup (Django)

All commands must be run **inside** the `myproject/backend/` directory unless stated otherwise.

### A) Ensure Python 3 is Installed
- Check by running `python --version` or `python3 --version` in your terminal.

### B) (Optional) Create a Virtual Environment
A virtual environment prevents package conflicts with other Python projects or global system packages.

1. Navigate to the backend folder:
   ```bash
   cd myproject/backend
   ```
2. Create a virtual environment (named "venv"):
   ```bash
   python -m venv venv
   ```
3. Activate the environment:
   - On Linux/Mac:
    ```bash
    source venv/bin/activate
    ```
   - On Windows:
    ```bash
    venv\Scripts\activate.bat
    ```

**Note**: If skipped, packages are installed globally (not recommended).

### C) Install Required Packages
1. Run:
   ```bash
   pip install -r requirements.txt
   ```
   This installs dependencies like Django, djangorestframework, django-cors-headers, Pillow, etc.

### D) Initialize the Database (Migrate)
1. Run:
   ```bash
   python manage.py migrate
   ```
   This creates/updates the `db.sqlite3` database file with the necessary tables.

### E) (Optional) Create a Django Superuser
1. Run:
   ```bash
   python manage.py createsuperuser
   ```
   This allows access to Django’s admin panel at `http://127.0.0.1:8000/admin`.

### F) Start the Django Development Server
1. Run:
   ```bash
   python manage.py runserver
   ```
   The backend will be available at `http://127.0.0.1:8000/`.

---

## 4. Frontend Setup (React)

All commands must be run **inside** `myproject/frontend`.

### A) Node.js and NVM
- React requires Node.js. Install it using `nvm` or download it from [Node.js](https://nodejs.org).

### B) Installing Packages
1. Navigate to the frontend folder:
   ```bash
   cd myproject/frontend
   ```
2. Run:
   ```bash
   npm install
   ```

### C) Starting the React Development Server
1. Run:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000/`.

---

## 5. Using the Application

Once both the Django server (`http://127.0.0.1:8000/`) and React server (`http://localhost:3000/`) are running, open your browser at:

- **Register**: `http://localhost:3000/register`
- **Login**: `http://localhost:3000/login`
- **Home**: `http://localhost:3000/` (your personal posts)
- **Admin**: `http://localhost:3000/admin` (only accessible if logged in as the hardcoded admin)

---

## 6. Hardcoded Admin Credentials

### Where It Is Located
- Defined in `backend/myapp/views.py`:
  ```python
  ADMIN_EMAIL = "admin@admin.com"
  ADMIN_PASSWORD = "admin123"
  ```

### How to Modify
1. Open `myproject/backend/myapp/views.py`.
2. Update `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

---

## 7. Ending the Application

To stop both services:
1. Press **Ctrl + C** in the Django terminal.
2. Press **Ctrl + C** in the React terminal.

---

## 8. Additional Notes & Tips

- **Database changes**: If you update `models.py`, run:
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```
- **Virtual environment**: Re-activate it for each new terminal session.
- **Global vs. local Node packages**: Local packages are installed in `node_modules`.

For further debugging or expansion, consult the official Django and React documentation.

