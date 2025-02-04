/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from 'mongoose'
import { IUser } from './auth.interface'
import config from '../../config'
import bcrypt from 'bcryptjs'

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

userSchema.pre('save', async function (next) {
  const salt_round = Number(config.BCRYPT_SALT)
  this.password = await bcrypt.hash(this.password, salt_round)
})

userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

export const user = model<IUser>('user', userSchema)
