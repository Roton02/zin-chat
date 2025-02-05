import { z } from 'zod'

const registrationValidation = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .max(100, 'Password is too long'),
  isActive: z.boolean().default(false),
})
const loginValidation = z.object({
  email: z.string().email('email is invalid'),
  password: z.string({ required_error: 'password is required' }),
})

export const userAuthValidation = {
  registrationValidation,
  loginValidation,
}
