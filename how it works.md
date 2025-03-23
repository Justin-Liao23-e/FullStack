# MYPROJECT: HOW IT WORKS

## 1. BACKEND (Django)

- We use Django REST Framework to handle API requests.
- The main Django project is in `myproject/` (inside the `backend` folder).
- In `myapp/` we define:
   - `models.py` -> Database structure (Post model referencing Django's User).
   - `serializers.py` -> How data is converted between Python objects and JSON.
   - `views.py` -> Logic for handling requests (register, login, logout, post CRUD, etc.).
   - `urls.py` -> Defines the routes/endpoints (like `/api/register/`, `/api/posts/`, etc.).
- By default, Django uses SQLite for the database (`db.sqlite3` file).
- Django's built-in `User` model is extended by linking to our `Post` model with a `ForeignKey`.

## 2. FRONTEND (React)

- The `frontend` folder has a small React application created (usually) via Create React App.
- We keep different components inside `src/components`.
- `App.js` is the main entry that sets up routes (using `react-router-dom`).
- Each component is responsible for a piece of the UI (e.g., Login, Register, Home).
- We have `api.js` as a simple helper to make fetch requests to the Django backend (at `http://127.0.0.1:8000/api/...`).
- `npm start` or `yarn start` runs the React dev server on `http://localhost:3000`.

## 3. WORKFLOW

- When a user registers, the frontend sends a POST request to `/api/register/` with the user data.
- Django creates a User, stores a hashed password, and returns success or errors.
- When a user logs in, the frontend sends a POST request to `/api/login/` with email and password.
   - Django verifies the user with the given email/password, then sets a session cookie so the user stays logged in.
- For each subsequent request (like listing posts, creating a post, etc.), the session cookie is used to check if the user is authenticated.
- The user can create/edit/delete their own posts at `/api/posts/`.
- The "hardcoded admin" is recognized if the login email and password match the constants in `views.py`. That admin can see all users (`GET /api/admin-panel/`) or delete them, and also remove any post.

## 4. IMPORTANT NOTES

- We rely on session-based authentication, so `"credentials: 'include'"` in fetch calls is necessary.
- If you want to change the admin credentials, you do so in `backend/myapp/views.py` under `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- If you want to use a different database (PostgreSQL, etc.), edit `myproject/settings.py` in the `DATABASES` section and install the appropriate driver.

## 5. END

This file is purely an overview. For detailed instructions, see `README.txt`.
