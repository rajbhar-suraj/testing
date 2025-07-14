import { Router } from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById
} from "../controllers/product.controller";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get('/:id', getProductById);
router.get("/", getProducts);
router.post("/", upload.array("images"), addProduct);
router.put("/:id", upload.array("images"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
