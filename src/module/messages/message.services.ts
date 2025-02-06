import AppError from '../../error/AppError'
import { user } from '../auth/auth.model'
import { IMessage } from './message.interface'
import { messages } from './message.model'

const storeMessageIntroDB = async (payload: IMessage) => {
  //checking the sender and reciver is exist in my database
  const sender = await user.findById(payload.sender)
  if (!sender) {
    throw new AppError(400, 'Sender not found')
  }
  const receiver = await user.findById(payload.receiver)
  if (!receiver) {
    throw new AppError(400, 'Receiver not found')
  }

  const result = await messages.create(payload)
  return result
}
const getMessageIntroDB = async (payload: string, email: string) => {
  //checking the sender and reciver is exist in my database
  const reciver = await user.findById(payload)
  if (!reciver) {
    throw new AppError(400, 'Reciver not a valid user ')
  }
  const sender = await user.findOne({ email: email })
  const result = await messages
    .find({
      $or: [
        { sender: sender?._id, receiver: payload },
        { sender: payload, receiver: sender?._id },
      ],
    })
    .populate('sender', "name email" )
    .populate('receiver' , "name email")
  return result
}

export const messageServices = { storeMessageIntroDB, getMessageIntroDB }
