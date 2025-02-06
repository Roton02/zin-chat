import { user } from '../auth/auth.model'
import { IMessage } from './message.interface'
import { messages } from './message.model'

const storeMessageIntroDB = async (payload: IMessage) => {
  //checking the sender and reciver is exist in my database
  const result = await messages.create(payload)
  return result
}
const getMessageIntroDB = async (payload: string, email: string) => {
  //checking the sender and reciver is exist in my database
  const sender = await user.findOne({ email: email })
  const result = await messages.find({ sender: sender?._id, receiver: payload })
  return result
}

export const messageServices = { storeMessageIntroDB, getMessageIntroDB }
