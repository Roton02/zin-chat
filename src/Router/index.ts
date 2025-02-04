import { Router } from "express";
import UserRouter from "../module/auth/auth.routes";

const router = Router()


const routers = [
  {
    path: '/auth',
    router: UserRouter,
  },
//   {
//     path: '/',
//     router: userRouter,
//   },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router
