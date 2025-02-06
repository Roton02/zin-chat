import express, { Request, Response } from 'express'
import notFound from './middleware/notFound'
import router from './Router'
import globalErrorHandler from './middleware/globalErrorHandler'
const app = express()

// middleware
app.use(express.json())


app.use('/api' , router)

app.get('/', (req :Request , res:Response)=>{
  res.json({
    success:true ,
    message:'welcome to Zin-Chat Application '
  })
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
