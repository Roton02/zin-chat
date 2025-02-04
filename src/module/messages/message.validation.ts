import { z } from 'zod'

const messageValidationSchema = z.object({
  sender: z.string().min(1, 'Sender ID is required'),
  receiver: z.string().min(1, 'Receiver ID is required'),
  content: z.string().min(1, 'Message content cannot be empty'),
})


export default messageValidationSchema