# GameTaskk - Referral & Commission System

A full-stack web application for managing referral programs and sharing commissions with users.

## Features

- 👥 User registration and authentication
- 🔗 Generate personalized referral links
- 📊 Real-time tracking of referrals
- 💰 Automatic commission calculation
- 📈 User dashboard with referral stats
- 💳 Commission withdrawal system
- 🏆 Leaderboard

## Tech Stack

### Frontend
- React 18 + Vite
- TailwindCSS
- Axios

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- Nodemailer

### Deployment
- Docker
- GitHub Actions

## Project Structure

```
gametassk/
├── backend/          # Node.js API server
├── frontend/         # React application
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/quangk2026-tech/gametassk.git
cd gametassk
```

2. Install dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

3. Setup environment variables
```bash
# Backend .env
MONGODB_URI=mongodb://localhost:27017/gametassk
JWT_SECRET=your_jwt_secret
PORT=5000

# Frontend .env
VITE_API_URL=http://localhost:5000
```

4. Start development servers
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

## API Documentation

See `backend/docs/API.md` for detailed API endpoints.

## License

MIT
