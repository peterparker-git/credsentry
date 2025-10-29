# CredSentry – Password Management Application

CredSentry is a secure and user-friendly password management application that allows users to store and manage login credentials using a full-stack architecture with React, Spring Boot, and MongoDB.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Axios for API communication

### Backend
- Spring Boot (Java)
- REST API services

### Database
- MongoDB (Local Server)

### Tools Used
- Postman for backend testing

---

## 🔑 Key Features

- User authentication system
- Add, view, update, and delete saved login credentials
- Smooth data communication between UI and backend
- Local database for secure development storage
- Backend endpoints verified using Postman

---

## 📂 Project Structure
CredSentry/
│
├── vite-project/ # React + Vite application
│
└── demo/ # Spring Boot server + APIs

---

---

## 🚀 How to Run the Application

### ✅ Prerequisites
Make sure the following are installed:
- Node.js
- Java JDK 17 or above
- Maven
- MongoDB (running locally on default port 27017)
- Postman (for API testing)

---

### ▶️ Running the Frontend (React + Vite)

cd vite-project
npm install
npm run dev
runs at: http://localhost:5173/

### Configure MongoDB in:

demo/src/main/resources/application.properties

spring.data.mongodb.uri=mongodb://127.0.0.1:27017/mydb
server.port=8081

### Run Spring Boot:

cd demo
mvn spring-boot:run

Backend runs at:

http://localhost:8081/api/users

## ✅ Project Highlights

Full-stack integration successfully implemented

CRUD functionalities tested using Postman

Local MongoDB for secure development

## 👤 Developer

Harihara Sudan P S
B.tech IT 43120060
Full-stack Developer (React + Spring Boot)
