import { model, Schema } from 'mongoose'
import { IMessage } from './message.interface';

const messageShcema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, required: true },
    receiver: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const messages = model<IMessage>('messages', messageShcema)
