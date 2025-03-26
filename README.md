## Screenshot Page Employee

![image](https://github.com/user-attachments/assets/cc9b4d91-9019-4e21-840b-f1aa39d17711)

## Screenshot Page Department

![image](https://github.com/user-attachments/assets/0298877f-90d6-46b4-be21-3c8e9fc52176)

## Installation

Sebelum mulai, pastikan kamu sudah menginstal:
✅ Node.js (>= 16.x)
✅ npm atau yarn
✅ MySQL atau database lain yang didukung

### Steps

**Clone the repository**
   ```bash
   git clone https://github.com/mangsopa/crud-express-react.git crud-express-react
   cd crud-express-react
   ```

## **Install Backend (Express.js)**

1. Masuk ke folder backend
   ```bash
   cd backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Buat file .env
   ```bash
   cp .env.example .env
   ```

4. Edit file .env (isi sesuai database kamu)
   ```env
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=xxxx
    DB_NAME=xxxx
   ```

5. Jalankan server backend
   ```bash
   npm run dev
   ```

## **Install Frontend (React.js)**

1. Masuk ke folder frontend
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Jalankan frontend
   ```bash
   npm start
   ```
   
## **Install Backend (Express.js)**

1. Buka MySQL dan buat database:
   ```bash
   CREATE DATABASE crud-express-react;
   ```

2. Jalankan migrasi database (jika ada)
   ```bash
    npm run migrate
   ```
