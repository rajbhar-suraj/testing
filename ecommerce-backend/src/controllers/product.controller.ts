import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { AppDataSource } from "../config/data-source";

const repo = AppDataSource.getRepository(Product);

export const getProducts = async (_req: Request, res: Response) => {
  const products = await repo.find();
  res.json(products);
};

export const addProduct = async (req: Request, res: Response) => {
  const { sku, name, price } = req.body;
  const images = req.files
    ? (req.files as Express.Multer.File[]).map((file) => file.filename)
    : [];

  const product = repo.create({ sku, name, price, images });
  await repo.save(product);
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const existing = await repo.findOneBy({ id });
  if (!existing) return res.status(404).json({ message: "Not found" });

  const { sku, name, price } = req.body;
  const images = req.files
    ? (req.files as Express.Multer.File[]).map((file) => file.filename)
    : existing.images;

  repo.merge(existing, { sku, name, price, images });
  await repo.save(existing);
  res.json(existing);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await repo.delete(id);
  res.json({ message: "Deleted" });
};
