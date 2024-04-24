# Descripción

Eccommerce de prueba para el curso de Next.js 14 de Fernando Herrera.

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del archivo `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependencias `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Correr el proyecto `npm run dev`

## Paypal SANDBOX credentials

**WARNING**: These credentials are for testing purposes only. Do not use your real credentials!.
**ADVERTENCIA**: Estas credenciales son solo para pruebas. ¡No utilices tus credenciales reales!

```
user: client_test@personal.examle.com
pass: Abc123456
```

## Correr en prod

# fh-nextjs-teslo-shop
