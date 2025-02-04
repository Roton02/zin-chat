import { Router } from 'express'
import { authControllers } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { userAuthValidation } from './auth.validation'

const UserRouter = Router()

UserRouter.post(
  '/register',
  validateRequest(userAuthValidation.registrationValidation),
  authControllers.createUser
)
UserRouter.post(
  '/login',
  validateRequest(userAuthValidation.loginValidation),
  authControllers.loginUser
)

export default UserRouter
