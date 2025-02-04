import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { messageServices } from "./message.services";



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


export const messageControllers = {
    storeMessage
}