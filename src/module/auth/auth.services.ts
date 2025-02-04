import config from '../../config'
import AppError from '../../error/AppError'
import { ILogin, IUser } from './auth.interface'
import { user } from './auth.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createUserIntroDB = async (payload: IUser) => {
  const isExist = await user.findOne({ email: payload.email })
  if (isExist) {
    throw new AppError(400, 'Email already exists')
  }
  const result = await user.create(payload)
  return result
}

const loginUserIntroDb = async (payload: ILogin) => {
  const UserData = await user
    .findOne({ email: payload.email })
    .select('+password')

  if (!UserData) {
    throw new AppError(401, 'Invalid credentials')
  }
  // console.log(UserData)
  const verifyPassword = await bcrypt.compare(
    payload.password,
    UserData.password
  )

  if (!verifyPassword) {
    throw new AppError(401, 'Invalid credentials')
  }

  const VerifiedUser = {
    email: UserData.email,
    name: UserData.name,
  }

  const secret = config.JWT_SECRET as string

  const token = jwt.sign(VerifiedUser, secret, { expiresIn: '1d' })

  return { token }
}

const getUserIntroDB = async () => {
  const result = await user.find().select('-password')
  return result
}

export const userServcies = {
  createUserIntroDB,
  loginUserIntroDb,
  getUserIntroDB
}
