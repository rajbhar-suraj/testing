import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import productRoutes from "./routes/product.routes";
import path from 'path';

const app = express();
const PORT = 3000;
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(
  cors({
    origin:"https://ecommerce-admin-mzxl.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/uploads", express.static("uploads")); // serve images
app.use("/api/products", productRoutes);

// Optional test route
app.get("/", (req, res) => {
  res.send("✅ Backend API is live");
});

// Start server after DB is ready
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error initializing database:", error);
    process.exit(1); // Exit so Render shows a failed deploy
  });