import { IMessage } from './message.interface'
import { messages } from './message.model'

const storeMessageIntroDB = async (payload: IMessage) => {
  //checking the sender and reciver is exist in my database
  const result = await messages.create(payload)
  return result
}

export const messageServices = { storeMessageIntroDB }
