# Blackjack Royal Mern (Backend)

Backend en Node.js + Express + TypeScript para autenticación y registro de estadísticas del juego Blackjack.

## Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- JWT para autenticación
- TypeScript

## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Renovación de token JWT.
- Registro de resultados de partidas.
- Consulta de estadísticas personales y globales.

## API principal

Prefijo base: `/api`

Endpoints de autenticación:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/renew-token`

Endpoints de estadísticas:

- `GET /api/stats/me`
- `POST /api/stats/register-result`
- `GET /api/stats/global`

## Requisitos previos

- Node.js 22.18+
- npm
- MongoDB (local o remoto)

## Variables de entorno

Crea un archivo `.env` usando `.env.template` como base.

Variables requeridas:

```env
PORT=3000
JWT_SEED=tu_clave_secreta
MONGO_URL=mongodb://usuario:password@localhost:27017/
MONGO_DB_NAME=blackjackdb
```

Puedes generar una clave JWT segura con:

```bash
openssl rand -hex 32
```

## Instalación

```bash
npm install
```

## Scripts disponibles

```bash
# Desarrollo con recarga
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar build compilado
npm start
```

## Ejecución en desarrollo

```bash
npm run dev
```

## Ejecución en producción local

```bash
npm run build
npm start
```

## Docker (MongoDB local)

El archivo `docker-compose.yml` levanta un contenedor de MongoDB en el puerto `27017`.

```bash
docker compose up -d
```

Importante:

- Este `docker-compose.yml` solo inicia MongoDB (no inicia el servidor backend).
- Asegúrate de que `MONGO_URL` en `.env` coincida con las credenciales configuradas en Docker.
