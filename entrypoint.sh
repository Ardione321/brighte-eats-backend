#!/bin/sh
set -e

echo "Running Prisma migrations..."
npx prisma migrate deploy

if [ "$NODE_ENV" = "production" ]; then
  echo "Starting app in production mode..."
  node dist/main.js
else
  echo "Running seed script..."
  npm run seed
  echo "Starting app in development mode..."
  npm run start:dev
fi
