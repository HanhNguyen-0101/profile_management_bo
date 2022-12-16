import { RequestHandler } from "express";
import { IBlog } from "../models/index.model";
import { Blog, Category, Media, SubCategory } from "../services/index.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Array<IBlog> = await Blog.findAll({
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Media,
          as: "media",
          map: "thumnail",
          include: [
            {
              model: SubCategory,
              as: "subCategory",
              map: "subCategoryId",
              include: [{ model: Category, as: "category", map: "categoryId" }],
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
    const item: IBlog = await Blog.findOne({
      where: { key: "id", value: id },
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Media,
          as: "media",
          map: "thumnail",
          include: [
            {
              model: SubCategory,
              as: "subCategory",
              map: "subCategoryId",
              include: [{ model: Category, as: "category", map: "categoryId" }],
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
    const result: Array<IBlog> = await Blog.findAll({
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Media,
          as: "media",
          map: "thumnail",
          include: [
            {
              model: SubCategory,
              as: "subCategory",
              map: "subCategoryId",
              include: [{ model: Category, as: "category", map: "categoryId" }],
            },
          ],
        },
      ],
      where: {
        or: [
          { where: { key: "title", value: keyword, like: true } },
          { where: { key: "subTitle", value: keyword, like: true } },
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
    await Blog.destroy({ where: { key: "id", value: id } });
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
    const newItem: IBlog = await Blog.create({
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
    const updated: IBlog = await Blog.findOne({
      where: { key: "id", value: id },
    });
    if (updated) {
      updated.title = title || updated?.title;
      updated.subTitle = subTitle || updated?.subTitle;
      updated.content = content || updated?.content;
      updated.thumnail = thumnail || updated?.thumnail;
      updated.subCategoryId = subCategoryId || updated?.subCategoryId;
      updated.description = description;
      await Blog.update(id, updated);
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
    const all: Array<IBlog> = await Blog.findAll({
      where: { key: "subCategoryId", value: id },
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Media,
          as: "media",
          map: "thumnail",
          include: [
            {
              model: SubCategory,
              as: "subCategory",
              map: "subCategoryId",
              include: [{ model: Category, as: "category", map: "categoryId" }],
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
