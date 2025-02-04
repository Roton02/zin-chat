import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServcies } from "./auth.services";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await userServcies.createUserIntroDB(payload)
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User registered successfully',
      data: result,
    })
  })
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await userServcies.loginUserIntroDb(payload)
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User Login successfully',
      data: result,
    })
  })
const getUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userServcies.getUserIntroDB()
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User retrived successfully',
      data: result,
    })
  })



export const authControllers = {
    createUser,
    loginUser,
    getUsers
}