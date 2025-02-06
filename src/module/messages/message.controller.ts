import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { messageServices } from './message.services'
import { JwtPayload } from 'jsonwebtoken'

const storeMessage = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await messageServices.storeMessageIntroDB(payload)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'message send  successfully',
    data: result,
  })
})
const getMessage = catchAsync(async (req: Request, res: Response) => {
  const {email} = req.user as JwtPayload
  const payload = req.params.userId as string
  const result = await messageServices.getMessageIntroDB(payload , email)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'message retrieved  successfully',
    data: result,
  })
})

export const messageControllers = {
  storeMessage,
  getMessage,
}
