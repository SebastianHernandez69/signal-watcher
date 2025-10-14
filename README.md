# Signal Watcher

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

## 📸 Capturas del flujo principal de la App
<img width="942" height="452" alt="home" src="https://github.com/user-attachments/assets/ef3c1e8d-77fd-45cc-92f2-93bdf5fa3717" />

<img width="953" height="448" alt="create-wl" src="https://github.com/user-attachments/assets/cda887a6-f153-4691-89f2-f98148e0ad77" />

<img width="953" height="451" alt="wls" src="https://github.com/user-attachments/assets/019e6d9f-ed12-4aab-bed0-85fe87a0fe0a" />

<img width="953" height="447" alt="wl" src="https://github.com/user-attachments/assets/b190ad36-cf89-41b2-812b-8be43d823f4d" />

<img width="938" height="451" alt="create-ev" src="https://github.com/user-attachments/assets/beb5a6ef-fc15-4fab-a013-d225b89778e4" />

<img width="953" height="450" alt="wl-ev1" src="https://github.com/user-attachments/assets/c94da094-7ace-4513-b6e9-4261225ff4fb" />

<img width="941" height="451" alt="simulate" src="https://github.com/user-attachments/assets/743d8f0a-96e6-469e-ab42-ec3e059e64a6" />

<img width="953" height="452" alt="wl-ev2" src="https://github.com/user-attachments/assets/ac8d21db-8eef-4152-9a96-0931de38bcd7" />




