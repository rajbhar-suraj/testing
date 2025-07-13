import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import productRoutes from "./routes/product.routes";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin:"https://ecommerce-app-1-ce5j.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/uploads", express.static("uploads")); // serve images
app.use("/api/products", productRoutes);

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
