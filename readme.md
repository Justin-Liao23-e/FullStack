# MyProject README

## 1. Overview

This is a simple web application that allows users to:

- Register an account (with email, password, first name, last name, and a username)
- Login/Logout
- Create, edit, or delete "posts" (like notes)
- Delete their own user account

Additionally, there is a hardcoded admin user (via special email and password) who can:

- View all users
- Delete any user
- Delete any post

---

## 2. Tech Stack

- **Backend**: Django (Python) with Django REST Framework
- **Frontend**: React (JavaScript)
- **Database**: SQLite (default in Django)

---

## 3. Directory Structure

The project is organized into two main folders:

- `backend`: Contains the Django project
- `frontend`: Contains the React application

Refer to the parent folder of this file for the full directory structure.

---

## 4. Backend Setup

Follow these steps to set up the Django backend:

1. Ensure Python 3 is installed.
2. *(Optional)* Create a virtual environment:
   ```bash
   cd myproject/backend
   python -m venv venv
   source venv/bin/activate      # Linux/Mac
   venv\Scripts\activate.bat     # Windows
   ```
3. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Run database migrations to set up the SQLite database:
   ```bash
   python manage.py migrate
   ```
5. *(Optional)* Create a Django superuser for the admin site:
   ```bash
   python manage.py createsuperuser
   ```
   You can then log in at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) if needed.
6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   The server will be running at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

## 5. Frontend Setup

Follow these steps to set up the React frontend:

1. Ensure Node.js is installed (version 16+ recommended).
2. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd myproject/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
4. Start the React development server:
   ```bash
   npm start
   # or
   yarn start
   ```
   The React app will be running at [http://localhost:3000/](http://localhost:3000/).

---

## 6. Using the Application

- Visit [http://localhost:3000/register](http://localhost:3000/register) to create a new user.
- Visit [http://localhost:3000/login](http://localhost:3000/login) to log in if already registered.
- Once logged in, the Home page ([http://localhost:3000/](http://localhost:3000/)) displays your posts.
- You can create, edit, or delete your posts.
- You can delete your account under your profile (if implemented on the frontend).
- The "hardcoded admin" credentials can be found in `backend/myapp/views.py` (variables `ADMIN_EMAIL` and `ADMIN_PASSWORD`).

---

## 7. End of README

Feel free to rename or convert this file to any format you prefer.

