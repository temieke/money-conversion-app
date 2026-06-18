# Installation Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Environment Variables (backend/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/money-conversion-app
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
NODE_ENV=development
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### Environment Variables (frontend/.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Database Setup

MongoDB connection is handled automatically by the backend. Make sure your MongoDB instance is running.

## Running the Application

1. Start MongoDB
2. Start the backend: `cd backend && npm run dev`
3. Start the frontend: `cd frontend && npm start`

The app will be available at `http://localhost:3000`

## API Documentation

See [API.md](./API.md) for detailed API endpoints and usage.
