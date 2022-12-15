import { RequestHandler } from "express";
import { Category } from "../models/category";
import { Op } from "sequelize";
import { SubCategory } from "../models/subCategory";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Category[] = await Category.findAll();
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: Category | null = await Category.findByPk(id);
    return res
      .status(200)
      .json({ message: "Fetched successfully", data: item });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const findByKeyword: RequestHandler = async (req, res, next) => {
  const { keyword } = req.params;
  try {
    const result: Category[] = await Category.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
    });
    return res
      .status(200)
      .json({ message: "Found successfully", data: result });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const remove: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Category.destroy({ where: { id } });
    await SubCategory.destroy({ where: { categoryId: id } });

    return res.status(200).json({
      message: "Deleted successfully",
      data: {
        message: `Delete ID: ${id} is successfully. Subcategory data (categoryId: ${id}) has removed!`,
      },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: RequestHandler = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const newItem: Category = await Category.create({
      name,
      description,
    });
    return res
      .status(201)
      .json({ message: "Created successfully", data: newItem });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const update: RequestHandler = async (req, res, next) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    const updated: Category | null = await Category.findByPk(id);
    if (updated) {
      updated.name = name || updated?.name;
      updated.description = description || updated?.description;
      await updated.save();
      return res
        .status(200)
        .json({ message: "Updated successfully", data: updated });
    } else {
      create;
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
