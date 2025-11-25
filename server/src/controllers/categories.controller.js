import { prisma } from '../config/db.js';

export const listCategories = async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const category = await prisma.category.create({ data: req.body });
  res.status(201).json(category);
};

export const updateCategory = async (req, res) => {
  const category = await prisma.category.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  await prisma.category.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Deleted' });
};
