# Prueba Técnica - Signal Watcher

## 📋 Requisitos
- **Node.js** ≥ 18
- **Docker** y **Docker Compose**

## ⚙️ Backend

### 🔧 Configuración
```bash
cd backend
cp .env.example .env
```

### 🐳 Levantar contenedores
```
docker-compose up -d
```

### 📦 Dependencias y migraciones
```
npm install
npm run migrate
npx prisma generate
```

### 🚀 Correr servidor
```
npm run dev
```

## 💻 Frontend
### 🔧 Configuración

```bash
cd frontend
cp .env.example .env
```

### 📦 Dependencias y Ejecución
```
npm install
npm run dev
```

## 🚀 Despliegue
- Frontend → se despliega automáticamente en Vercel
 vía GitHub Actions.

- Backend → se despliega automáticamente en Railway
 después de verificar el build en GitHub Actions.

## 📁 Estructura del proyecto
``` 
.
├── backend/        # API con Express, Prisma, PostgreSQL y Redis
├── frontend/       # App con Next.js + ShadCN UI
└── docs/           # Documentación (ADR, Runbook)
```


