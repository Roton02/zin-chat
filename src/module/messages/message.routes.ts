import { Router } from 'express'
import { messageControllers } from './message.controller'
import validateRequest from '../../middleware/validateRequest'
import messageValidationSchema from './message.validation'
import auth from '../../middleware/auth'

const messageRouter = Router()

messageRouter.post(
  '/messages',
  auth(),
  validateRequest(messageValidationSchema),
  messageControllers.storeMessage
)
messageRouter.get(
  '/messages/:userId',
  // auth(),
  messageControllers.getMessage
)

export default messageRouter