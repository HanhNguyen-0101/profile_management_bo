import { RequestHandler } from "express";
import { SubCategory } from "../models/subCategory";
import { Op } from "sequelize";
import { Category } from "../models/category";
import { Blog } from "../models/blog";
import { Media } from "../models/media";
import { Project } from "../models/project";
import { User } from "../models/user";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: SubCategory[] = await SubCategory.findAll({
      include: [Category],
    });
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: SubCategory | null = await SubCategory.findByPk(id, {
      include: [Category],
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
    const result: SubCategory[] = await SubCategory.findAll({
      include: [Category],
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
    await SubCategory.destroy({ where: { id } });
    await Blog.destroy({ where: { subCategoryId: id } });
    await Media.destroy({ where: { subCategoryId: id } });
    await Project.destroy({ where: { subCategoryId: id } });
    await User.destroy({
      where: { [Op.or]: [{ status: id }, { resetPasswordStatus: id }] },
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
    const newItem: SubCategory = await SubCategory.create({
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
    const updated: SubCategory | null = await SubCategory.findByPk(id);
    if (updated) {
      updated.name = name || updated?.name;
      updated.description = description || updated?.description;
      updated.categoryId = categoryId || updated?.categoryId;
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
