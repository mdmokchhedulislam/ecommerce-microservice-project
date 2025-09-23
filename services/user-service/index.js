import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js'
import { dbConnected } from './utils/db.js';

// import rateLimit from 'express-rate-limit';

import cookieParser from "cookie-parser";
import dotenv from "dotenv"


const app = express();
dotenv.config()
const PORT = process.env.PORT

dbConnected();






app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://www.mokchhedulislam.page.gd', // React app port (Vite হলে 5173)
  credentials: true
}));


app.use("/api/auth", userRouter);


// Run Your Express Back End Project
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});