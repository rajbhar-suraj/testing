import { DataSource } from "typeorm";
import { Product } from "../entity/Product";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
    url: process.env.DATABASE_URL,  // ✅ Use env variable

  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Product],
  ssl: {
    rejectUnauthorized: false, // Required for Render
  },
});
