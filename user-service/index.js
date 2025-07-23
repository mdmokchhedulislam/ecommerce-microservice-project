import express from 'express';
import cors from 'cors';

// import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";

import dotenv from "dotenv"
import userRouter from './routes/userRouter.js'
import { dbConnected } from './utils/db.js';


const app = express();
dbConnected();

dotenv.config()

const PORT = 3000

app.use(cors({
  origin: 'http://localhost:5173', // React app port (Vite হলে 5173)
  credentials: true
}));










app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(hpp());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cookieParser());

// Rate Limiter
// const limiter = rateLimit({
//   windowMs: REQUEST_LIMIT_TIME,
//   max: REQUEST_LIMIT_NUMBER,
// });
// app.use(limiter);

// Web Caching
// app.set('etag', WEB_CACHE);


app.use("/api/auth", userRouter);


// Run Your Express Back End Project
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});