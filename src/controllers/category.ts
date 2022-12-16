import { RequestHandler } from "express";
import { ICategory } from "../models/index.model";
import { Category, SubCategory } from "../services/index.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Array<ICategory> = await Category.findAll({});
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: ICategory = await Category.findOne({
      where: { key: "id", value: id },
    });
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
    const result: Array<ICategory> = await Category.findAll({
      where: {
        or: [
          { where: { key: "name", value: keyword, like: true } },
          { where: { key: "description", value: keyword, like: true } },
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
    await Category.destroy({ where: { key: "id", value: id } });
    await SubCategory.destroy({ where: { key: "categoryId", value: id } });

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
    const newItem: ICategory = await Category.create({
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
    const updated: ICategory = await Category.findOne({
      where: { key: "id", value: id },
    });
  if (updated) {
      updated.name = name || updated?.name;
      updated.description = description || updated?.description;
      await Category.update(id, updated);
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
