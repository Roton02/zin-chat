import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'socket.io'
import http from 'http'

const server = http.createServer(app) // ✅ Attach the existing Express app

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'], // ✅ Allow frontend connection
  },
})

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected', socket.id)

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id)
  })
})

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string)

    server.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

startServer()

export { io }
