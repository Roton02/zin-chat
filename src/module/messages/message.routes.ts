import { Router } from 'express'
import { messageControllers } from './message.controller'
import validateRequest from '../../middleware/validateRequest'
import messageValidationSchema from './message.validation'

const messageRouter = Router()

messageRouter.post(
  '/messages',
  validateRequest(messageValidationSchema),
  messageControllers.storeMessage
)

export default messageRouter