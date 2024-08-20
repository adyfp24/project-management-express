
# SEAL - API - Technical Test

Ini merupakan repository untuk techincal test dari program internship MSIB 7 SEAL. Merupakan sebuah REST API dengan framework node js express js, prisma ORM, jest, dan swagger.




## Tech Stack

**Runtime:** Node JS

**Library:** Express JS, Jest, Swagger, Bcrypt, supertest, Prisma, JWT, dotenv

**Database:** Mysql



## Installation

Inisiasi Project

```bash
  npm install 
```

Konfigurasi database dan secret key
```bash
  open file .env
```
Menjalankan migrasi database

```bash
  npx prisma migrate deploy
```

Menjalankan seeder (optional)
```bash
  npm run seed
```

Menjalankan server
```bash
  npm run start
```
    
## API Reference

#### Documentation route with swagger

```http
  GET /api-docs
```

Mengakses rute dokumentasi API yang di generate menggunakan swagger. Terdapat informasi rute apa saja yang tersedia dan keterangan request serta response yang diberikan.


## Running Tests

Untuk menjalankan unit test, matikan server terlebih dahulu lalu jalankan perintah ini

```bash
  npm run test
```

