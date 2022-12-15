import { RequestHandler } from "express";
import {
  SubCategory,
  Category,
  Blog,
  Media,
  Project,
  User,
} from "../services/index.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Array<any> = await SubCategory.findAll({
      include: [{ model: Category, as: "category", map: "categoryId" }],
    });
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: any = await SubCategory.findOne({
      include: [{ model: Category, as: "category", map: "categoryId" }],
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
    const result: Array<any> = await SubCategory.findAll({
      include: [{ model: Category, as: "category", map: "categoryId" }],
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
    await SubCategory.destroy({ where: { key: "id", value: id } });
    await Blog.destroy({ where: { key: "subCategoryId", value: id } });
    await Media.destroy({ where: { key: "subCategoryId", value: id } });
    await Project.destroy({ where: { key: "subCategoryId", value: id } });
    await User.destroy({
      where: {
        or: [
          { where: { key: "status", value: id } },
          { where: { key: "resetPasswordStatus", value: id } },
        ],
      },
    });

    return res.status(200).json({
      message: "Deleted successfully",
      data: {
        message: `Delete ID: ${id} is successfully. Blog, Project, User and Media data (subCategoryId/status/resetPasswordStatus: ${id}) have removed!`,
      },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: RequestHandler = async (req, res, next) => {
  const { name, description, categoryId } = req.body;
  try {
    const newItem: any = await SubCategory.create({
      name,
      description,
      categoryId,
    });
    return res
      .status(201)
      .json({ message: "Created successfully", data: newItem });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const update: RequestHandler = async (req, res, next) => {
  const { name, description, categoryId } = req.body;
  const { id } = req.params;
  try {
    const updated: any = await SubCategory.findOne({
      where: { key: "id", value: id },
    });
    if (updated) {
      updated.name = name || updated?.name;
      updated.description = description || updated?.description;
      updated.categoryId = categoryId || updated?.categoryId;
      await SubCategory.update(id, updated);
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
