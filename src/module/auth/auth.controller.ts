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
    const {token} = await userServcies.loginUserIntroDb(payload)

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true, 
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    })

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User Login successfully',
      data: '',
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