# FreshBasket Backend

Minimal Express backend for FreshBasket with MongoDB.

## Setup

1. Create a `.env` file from `.env.example`.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## Available routes

- `GET /` - health check
- `POST /api/auth/register` - register a new user
- `GET /api/users` - list all users
- `GET /api/products` - get sample product data

## Environment variables

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - secret used for token generation
- `PORT` - backend server port
