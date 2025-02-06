import { NextFunction, Request, Response } from 'express'
// import AppError from '../error/AppError'
import config from '../config'
import jwt, { JwtPayload } from 'jsonwebtoken'
// import catchAsync from '../utils/catchAsync'
import { user } from '../module/auth/auth.model'

const auth = () => {
  console.log('outer');
  return (
    async (req: Request, res: Response, next: NextFunction) => {
      console.log('inner');
      const token = req.headers.authorization?.split(' ')[1]
      console.log(token)
      if (!token) {
        throw new Error(' token not found ')
      }
      // check if the token is valid
      const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload
      const { email } = decoded
  
      const userData = await user.findOne({ email: email })
      // check user already exit
      if (!userData) {
        throw new Error('The user is not found')
      }
  
      req.user = decoded as JwtPayload
      next()
    }
  )
}

export default auth
