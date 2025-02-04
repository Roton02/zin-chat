/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express'
import notFound from './middleware/notFound'
const app = express()

// middleware
app.use(express.json())

// app.use('/api/products', BikesRouter) //    /api/products
// app.use('/api/orders', OrderRouter)
// app.use('/')

app.get('/', (req :Request , res:Response)=>{
  res.json({
    success:true ,
    message:'welcome to Zin-Chat Application '
  })
})

app.use((err: any, req: Request, res: Response) => {
  // console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message,
    error: err.stack,
  })
})
app.use(notFound)

export default app
