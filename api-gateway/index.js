import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user_routes.js"
import productRoutes from  "./routes/product_routes.js"
import cartRoutes from "./routes/cart_routes.js"
import paymentRoutes from "./routes/payment_routes.js"


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => res.send("API Gateway running!"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
