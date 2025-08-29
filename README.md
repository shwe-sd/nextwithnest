# Next with Nest 🚀

Fullstack boilerplate combining **Next.js (React)** frontend with **NestJS** backend and **MySQL** database.  
Docker-powered for local development and production.

Live demo: [http://3.26.99.48:3000](http://3.26.99.48:3000)

---

## 📦 Tech Stack
- **Frontend:** Next.js (React, TypeScript, TailwindCSS)
- **Backend:** NestJS (REST API)
- **Database:** MySQL 8
- **Containerization:** Docker & Docker Compose
- **Testing:** Jest (unit & integration)

---

## 🔧 Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/shwe-sd/nextwithnest.git
cd nextwithnest
```

### 2. Environment variables
Create `.env` files for server and client.

**`server/.env`**
```env
DB_HOST=mysql_db
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_DATABASE=quizdb
JWT_SECRET=supersecret
```

**`client/.env.local`**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5002
```

> Note: Docker Compose already mounts `.env` for MySQL and server.

### 3. Run with Docker
```bash
docker compose up --build
```

Services:
- Client → http://localhost:3000  
- Server → http://localhost:5002  
- MySQL → localhost:3306  

### 4. Stop containers
```bash
docker compose down
```

---

## 🗂 Project Structure
```
nextwithnest/
├─ client/               # Next.js frontend
│  ├─ src/
│  │  ├─ api/            # API clients
│  │  ├─ hooks/          # React hooks
│  │  ├─ components/     # UI components
│  │  └─ pages/          # Next.js routes
│  └─ package.json
│
├─ server/               # NestJS backend
│  ├─ src/
│  │  ├─ auth/           # Auth module
│  │  ├─ products/       # Product module
│  │  └─ app.module.ts
│  └─ package.json
│
├─ docker-compose.yml    # Runs client, server & MySQL
└─ README.md
```

---

## 📖 API (Sample)

### Auth
- `POST /auth/signup` – Register user  
- `POST /auth/login` – Login user  

### Products
- `GET /products` – List products  
- `GET /products/:id` – Product details  
- `POST /products` – Create product (admin)  

---

## 🧪 Testing
```bash
# client
cd client
npm run test
```

---

## 🚀 Deployment
- Use Docker Compose in production with `docker compose -f docker-compose.yml up -d`
- Or deploy client separately to Vercel, server to EC2/other hosting, and MySQL to RDS.

---

## 👨‍💻 Author
Built by [Shwe](https://github.com/shwe-sd)  
Live: [http://3.26.99.48:3000](http://3.26.99.48:3000)
