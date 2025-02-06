import app from './app'
import config from './config'
import { Server } from 'socket.io'
import http from 'http'
import { messages } from './module/messages/message.model'
import mongoose from 'mongoose'

const server = http.createServer(app) // ✅ Attach Express app to HTTP server

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'], // ✅ Allow frontend connection
  },
})

// ✅ Store active users
const userSocketMap: Record<string, string> = {} // { userId: socketId }

io.on('connection', async (socket) => {
  console.log('🟢 A user connected:', socket.id)

  // Handle user joining
  socket.on('join', async (userId: string) => {
    userSocketMap[userId] = socket.id
    console.log(`✅ User ${userId} is online.`)
    io.emit('activeUsers', Object.keys(userSocketMap)) // Broadcast active users
  })

  // ✅ Handle message sending
  socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
    console.log(`📨 Message from ${senderId} to ${receiverId}: ${message}`)

    // Save message in MongoDB
    const newMessage = await messages.create({
      sender: senderId,
      receiver: receiverId,
      content: message,
      timestamp: new Date(),
    })

    // ✅ Find the receiver's socket ID
    const receiverSocketId = userSocketMap[receiverId]

    if (receiverSocketId) {
      // Send message to receiver if online
      io.to(receiverSocketId).emit('receiveMessage', newMessage)
    }

    // Send confirmation back to sender
    socket.emit('messageSent', newMessage)
  })

  // ✅ Handle disconnection
  socket.on('disconnect', () => {
    const disconnectedUser = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key] === socket.id
    )

    if (disconnectedUser) {
      delete userSocketMap[disconnectedUser]
      console.log(`🔴 User ${disconnectedUser} disconnected.`)
      io.emit('activeUsers', Object.keys(userSocketMap)) // Update active users list
    }
  })
})

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string)
    const PORT = process.env.PORT || config.port
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

startServer()

export default io
