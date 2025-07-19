import express from 'express'
import productRouter from './routes/productRoute.js'
import { dbConnected } from './utils/db.js'

const app = express()
dbConnected()

app.use('/api', productRouter)

app.listen(3000, ()=>{
    console.log("server is running port 3000");
    
})