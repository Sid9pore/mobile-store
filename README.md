# 📱 Mobile Store

A full-stack mobile e-commerce platform where users can browse and purchase mobile phones, while admins manage products via a dashboard. The system is built using **React** for the frontend, **Spring Boot** for the admin backend, and **Go (Gin + GORM)** for the user backend.

---

## 🚀 Features

### 👤 User Features
- User registration and login (JWT-based)
- Browse and view mobile products
- Add products to cart and place orders

### 🛠️ Admin Features
- Admin login
- Add, edit, and delete products
- View all available products

---

## 🧱 Tech Stack

| Layer       | Technology                     |
|-------------|---------------------------------|
| Frontend    | React, Tailwind CSS             |
| Backend API | Go (Gin), GORM, SQLite/PostgreSQL |
| Admin API   | Java Spring Boot                |
| Auth        | JWT (Go backend)                |
| Database    | SQLite (dev), PostgreSQL (prod) |

---

## 📂 Project Structure

mobile-store/
├── backend/ # Go backend for user registration and product API
│ ├── controllers/
│ ├── models/
│ └── utils/
├── admin/ # Spring Boot backend for admin product management
│ └── src/
├── frontend/ # React-based frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── utils/

---

## 🧪 Running Locally

### ✅ Prerequisites

- Go 1.20+
- Node.js 18+
- Java 17+ (for Spring Boot Admin backend)
- GCC (for `go-sqlite3`, or use a pure Go driver like `modernc.org/sqlite`)
- Git
- (Optional) Docker for containerized DB

---

### ⚙️ Backend (Gin - User API)

```bash
cd backend
go mod tidy
go run main.go
By default, it uses SQLite. You can modify it for PostgreSQL/MySQL if needed.

✅ Test the Go backend
cd backend/controllers
go test -v
If you get CGO errors, install GCC or use a pure Go SQLite driver.

For db setup 
docker run -d --name postgres-server --network video-ad-net -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=myNewP@ssw0rd -e POSTGRES_DB=mobileAppStore -v "%cd%\db:/docker-entrypoint-initdb.d" -p 8084:5432 postgres


🌐 Frontend (React + Tailwind)
cd frontend
npm install
npm start
Visit: http://localhost:3000

🔌 API Overview
🧑 User Endpoints (Go - Gin)
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Login with JWT token
GET	/products	Fetch product listings

🛠️ Admin Endpoints (Go - Gin)
Method	Endpoint	Description
GET	/admin/products	List all products
POST	/admin/products	Add a new product
PUT	/admin/products/{id}	Update a product
DELETE	/admin/products/{id}	Delete a product

📧 Contact
Author: Sid9pore
📫 Email: sid9pore@example.com (replace with actual contact)