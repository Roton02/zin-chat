import { Router } from 'express'
import { authControllers } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { userAuthValidation } from './auth.validation'

const UserRouter = Router()

UserRouter.post(
  '/auth/register',
  validateRequest(userAuthValidation.registrationValidation),
  authControllers.createUser
)
UserRouter.post(
  '/auth/login',
  validateRequest(userAuthValidation.loginValidation),
  authControllers.loginUser
)
UserRouter.get('/users', authControllers.getUsers)

export default UserRouter
