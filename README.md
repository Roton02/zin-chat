# Real-time Chat Application

This is a simple real-time chat application built using **Node.js, Express.js, MongoDB, and Socket.io**. The application allows users to communicate in real-time with authentication and message persistence.

## 🚀 Features

- **User Authentication** (JWT-based authentication - Sign Up & Login)
- **Real-time Messaging** using Socket.io
- **Message Persistence** (Messages stored in MongoDB)
- **User List** (Fetch all registered users)
- **Previous Chat History** (Fetch previous messages between users)
- **RESTful API Endpoints** for user and chat management
- **Secure Password Hashing** using bcrypt.js
- **Deployment Ready** (Optional - Render/Vercel/Heroku)

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt.js, Socket.io
- **Database:** MongoDB (Atlas or Local MongoDB instance)
- **Real-time Communication:** Socket.io
- **Version Control:** Git & GitHub

---

## 📌 Installation & Setup

### Prerequisites
- **Node.js** installed (v14 or later)
- **MongoDB** (Local or Atlas)
- **Git** installed

### Steps to Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and configure it:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```sh
   npm start
   ```

5. The server will run on `http://localhost:5000`

---

## 🔌 API Endpoints

### **User Authentication**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user and get JWT token |

### **User Management**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/users` | Fetch list of registered users |

### **Chat Management**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/messages/:userId` | Fetch previous messages between users |

---

## ⚡ WebSocket Events (Socket.io)

| Event | Description |
|--------|-------------|
| `connect` | When a user connects to the server |
| `message` | Sent when a user sends a message |
| `userJoined` | Sent when a user joins the chat |
| `userLeft` | Sent when a user leaves the chat |
| `disconnect` | When a user disconnects |

---

## 📦 Project Structure

```
chat-app/
│── config/
│   ├── db.js       # MongoDB connection
│── models/
│   ├── User.js     # User Schema
│   ├── Message.js  # Message Schema
│── routes/
│   ├── auth.js     # Authentication Routes
│   ├── users.js    # User Management Routes
│   ├── messages.js # Message Fetching Routes
│── server.js       # Express Server
│── socket.js       # Socket.io Setup
│── .env            # Environment Variables
│── package.json    # Dependencies
│── README.md       # Documentation
```

---

## 🛡 Security Measures
- Passwords are **hashed** using bcrypt.js
- JWT is used for **secure authentication**
- Environment variables (`.env`) are used to store sensitive data

---

