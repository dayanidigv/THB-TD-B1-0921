# Full-Stack Authentication Demo

Minimal authentication system with **Email/Password** and **Google OAuth** login.

## 📁 Project Structure

```
login-system/
├── back-end/              # Node.js + Express + MongoDB API
│   ├── models/
│   │   └── User.js        # User schema with bcrypt hashing
│   ├── routes/
│   │   └── auth.js        # Signup, Login, Google OAuth, Profile routes
│   ├── middleware/
│   │   └── auth.js        # JWT verification middleware
│   ├── server.js          # Express app setup
│   ├── package.json
│   └── .env.example
│
└── front-end/             # React + Bootstrap UI
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js    # Auth state management
    │   ├── components/
    │   │   └── ProtectedRoute.js # Route protection
    │   ├── pages/
    │   │   ├── Login.js          # Login page + Google button
    │   │   ├── Signup.js         # Signup page + Google button
    │   │   └── Profile.js        # Protected user profile
    │   ├── App.js                # Router setup
    │   └── index.js
    ├── public/
    │   └── index.html
    ├── package.json
    └── .env.example
```

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas)
- Google Cloud Console project (for OAuth)

### 2. Backend Setup

```bash
cd back-end

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your values:
# MONGODB_URI=mongodb://localhost:27017/auth-demo
# JWT_SECRET=your-super-secret-key
# GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
# PORT=5001

# Start server
npm start
```

Server runs at `http://localhost:5001`

### 3. Frontend Setup

```bash
cd front-end

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your Google Client ID:
# REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
# REACT_APP_BACKEND_URL=http://localhost:5001

# Start React app
npm start
```

App runs at `http://localhost:3000`

### 4. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Add **Authorized JavaScript origins**:
   - `http://localhost:3000`
7. Add **Authorized redirect URIs**:
   - `http://localhost:3000`
8. Copy **Client ID** and paste in both `.env` files

> **Note**: Changes may take a few minutes to propagate

## 🔑 Key Features

### Backend (`back-end/`)

**User Model** ([models/User.js](back-end/models/User.js))
- Email/password fields with bcrypt hashing (pre-save hook)
- Google OAuth support (googleId field)
- Password comparison method

**Auth Routes** ([routes/auth.js](back-end/routes/auth.js))
- `POST /api/auth/signup` - Email/password registration
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/google` - Google OAuth (id_token verification)
- `GET /api/auth/profile` - Protected route (requires JWT)
- Comprehensive logging for all operations

**JWT Middleware** ([middleware/auth.js](back-end/middleware/auth.js))
- Verifies Bearer token from `Authorization` header
- Attaches `userId` to request for protected routes
- Logs authentication attempts and failures

### Frontend (`front-end/`)

**Auth Context** ([src/context/AuthContext.js](front-end/src/context/AuthContext.js))
- Global auth state (user, loading)
- Methods: `login()`, `signup()`, `googleLogin()`, `logout()`
- Auto-loads user on app start if token exists
- Axios interceptor for JWT header
- Global `API_URL` constant with fallback
- Comprehensive logging for all auth actions

**Pages**
- [Login.js](front-end/src/pages/Login.js) - Email/password form + Google button (redirects if logged in)
- [Signup.js](front-end/src/pages/Signup.js) - Registration form + Google button (redirects if logged in)
- [Profile.js](front-end/src/pages/Profile.js) - Protected page showing user info

**Protected Routes** ([src/components/ProtectedRoute.js](front-end/src/components/ProtectedRoute.js))
- Redirects to `/login` if not authenticated
- Shows loading spinner during auth check

**UI Framework**
- Bootstrap 5 for styling

## 📦 Dependencies

### Backend
```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ODM",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT generation/verification",
  "google-auth-library": "Google OAuth token verification",
  "cors": "Cross-origin requests",
  "dotenv": "Environment variables"
}
```

### Frontend
```json
{
  "react": "UI library",
  "react-router-dom": "Client-side routing",
  "axios": "HTTP client",
  "@react-oauth/google": "Google OAuth React component",
  "bootstrap": "UI framework",
  "react-scripts": "Create React App tooling"
}
```

## 🔐 Authentication Flow

### Email/Password Login
1. User submits email + password
2. Backend finds user, compares password with bcrypt
3. Returns JWT token + user data
4. Frontend stores token in localStorage
5. Token sent in `Authorization: Bearer <token>` header for protected routes

### Google OAuth Login
1. User clicks Google button
2. Google popup → user selects account
3. Frontend receives `id_token` (credential)
4. Sends to backend `/api/auth/google`
5. Backend verifies token with Google
6. Finds/creates user with Google data
7. Returns JWT token + user data
8. Frontend stores token and redirects to profile

## 🧪 Testing

1. **Start MongoDB**: `mongod` (or use MongoDB Atlas)
2. **Start Backend**: `cd back-end && npm start`
3. **Start Frontend**: `cd front-end && npm start`
4. **Test flows**:
   - Signup with email/password → redirects to profile
   - Logout → redirects to login
   - Login with Google → redirects to profile
   - Try accessing `/profile` without login → redirects to login
   - Try accessing `/login` when logged in → redirects to profile
5. **Check logs**:
   - Frontend: Open browser console (F12) to see client-side logs
   - Backend: Check terminal for server logs

## 📊 Logging

### Frontend Logs (Browser Console)
- 🔑 Token detection on app load
- 🔐 Login/Signup attempts and results
- ✅ Success messages with user data
- ❌ Error messages with details
- 🚪 Logout actions
- ℹ️ User loading status

### Backend Logs (Terminal)
- 📨 HTTP requests (method + path)
- 🔐 Authentication attempts (login/signup/Google)
- ✅ Successful operations
- ❌ Failed operations with reasons
- 👤 Profile access
- 🔑 Token verification results

## 📝 Notes

- Backend runs on port **5001** (configurable in `.env`)
- Frontend runs on port **3000** (React default)
- JWT expires in 7 days (configurable in [routes/auth.js](back-end/routes/auth.js))
- Passwords hashed with bcrypt (10 salt rounds)
- Google OAuth uses `id_token` verification (no refresh tokens in this demo)
- CORS enabled for `localhost:3000` (adjust in production)
- MongoDB connection uses default settings (no authentication)
- Comprehensive logging enabled on both frontend and backend
- Login/Signup pages automatically redirect if user is already authenticated
- React hooks optimized with `useCallback` to prevent unnecessary re-renders

## 🔒 Production Checklist

- [ ] Use strong JWT_SECRET (random 256-bit key)
- [ ] Enable MongoDB authentication
- [ ] Configure CORS for production domain
- [ ] Use HTTPS
- [ ] Add rate limiting (express-rate-limit)
- [ ] Add input validation (express-validator)
- [ ] Set secure cookie options for tokens
- [ ] Add refresh token mechanism
- [ ] Configure proper Google OAuth redirect URIs
- [ ] Remove console.log statements in production
- [ ] Set up environment-specific configs
- [ ] Add error tracking (Sentry, LogRocket)

---

**Demo ready!** 🎉
