# Runbook - Signal Watcher

## Introduccion
Signal Watcher es un sistema de listas de observación y eventos de seguridad.  
Está compuesto por:
- Backend: Express + Prisma (Postgres + Redis).
- Frontend: Next.js (SSR + Server Actions).
- Infraestructura: Railway (Backend + DB) + Redis Cloud (Redis), Vercel (Frontend).

---
## 🚀 Operación

### Levantar servicios manualmente
- **Backend**
```bash
cd backend
cp .env.example .env

docker-compose up -d #Levantar contenedor (Postgres + Redis)

npm install
npm run migrate
npx prisma generate

npm run dev
```
- **Frontend**
```bash
cd frontend
cp .env.example .env

npm install
npm run build
npm start
```

### Variables de entorno críticas
- DATABASE_URL → Conexión Postgres.

- REDIS_URL → Conexión Redis.

- BACKEND_URL → URL del backend para el frontend.

- FRONTEND_URL → URL del frontend para el backend.

### Monitoreo
- Logs del backend.
- Endpoint `/` para conocer estado del servidor.

### Despliegue
- Frontend: Vercel.
- Backend: Railway.