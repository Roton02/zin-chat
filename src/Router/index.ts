import { Router } from "express";
import UserRouter from "../module/auth/auth.routes";
import messageRouter from "../module/messages/message.routes";

const router = Router()


const routers = [
  {
    path: '/',
    router: UserRouter,
  },
  {
    path: '/',
    router: messageRouter,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router
