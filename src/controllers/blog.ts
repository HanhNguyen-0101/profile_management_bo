import { RequestHandler } from "express";
import { Blog } from "../models/blog";
import { Op } from "sequelize";
import { SubCategory } from "../models/subCategory";
import { Media } from "../models/media";
import { Category } from "../models/category";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Blog[] = await Blog.findAll({
      include: [
        {
          model: SubCategory,
          include: [Category],
        },
        {
          model: Media,
          include: [
            {
              model: SubCategory,
              include: [Category],
            },
          ],
        },
      ],
    });
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: Blog | null = await Blog.findByPk(id, {
      include: [
        {
          model: SubCategory,
          include: [Category],
        },
        {
          model: Media,
          include: [
            {
              model: SubCategory,
              include: [Category],
            },
          ],
        },
      ],
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
    const result: Blog[] = await Blog.findAll({
      include: [
        {
          model: SubCategory,
          include: [Category],
        },
        {
          model: Media,
          include: [
            {
              model: SubCategory,
              include: [Category],
            },
          ],
        },
      ],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            subTitle: {
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
    await Blog.destroy({ where: { id } });
    return res.status(200).json({
      message: "Deleted successfully",
      data: { message: `Delete ID: ${id} is successfully` },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: RequestHandler = async (req, res, next) => {
  const { title, subTitle, description, content, thumnail, subCategoryId } =
    req.body;
  try {
    const newItem: Blog = await Blog.create({
      title,
      subTitle,
      description,
      content,
      thumnail,
      subCategoryId,
    });
    return res
      .status(201)
      .json({ message: "Created successfully", data: newItem });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const update: RequestHandler = async (req, res, next) => {
  const { title, subTitle, description, content, thumnail, subCategoryId } =
    req.body;
  const { id } = req.params;
  try {
    const updated: Blog | null = await Blog.findByPk(id);
    if (updated) {
      updated.title = title || updated?.title;
      updated.subTitle = subTitle || updated?.subTitle;
      updated.content = content || updated?.content;
      updated.thumnail = thumnail || updated?.thumnail;
      updated.subCategoryId = subCategoryId || updated?.subCategoryId;
      updated.description = description;
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
export const getBySubCategoryId: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const all: Blog[] = await Blog.findAll({
      where: {
        subCategoryId: id
      },    
      include: [
        {
          model: SubCategory,
          include: [Category],
        },
        {
          model: Media,
          include: [
            {
              model: SubCategory,
              include: [Category],
            },
          ],
        },
      ],
    });
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
