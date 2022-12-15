import { RequestHandler } from "express";
import {
  Media,
  SubCategory,
  Category,
  Blog,
  User,
  Project,
} from "../services/index.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Array<any> = await Media.findAll({
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
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
    const item: any = await Media.findOne({
      where: { key: "id", value: id },
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
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
    const result: Array<any> = await Media.findAll({
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
      ],
      where: {
        or: [
          { where: { key: "title", value: keyword, like: true } },
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
    await Media.destroy({ where: { key: "id", value: id } });
    await Blog.destroy({ where: { key: "thumnail", value: id } });
    await User.destroy({ where: { key: "avatar", value: id } });
    const projects = await Project.findAll({
      where: { key: "images", value: id, like: true },
    });
    projects?.map(async (p: any) => {
      const project = await Project.findOne({
        where: { key: "id", value: p.id },
      });
      if (
        project &&
        project.images &&
        JSON.parse(project.images).includes(id)
      ) {
        const arr = JSON.parse(project.images);
        const index = arr.indexOf(id);
        if (index !== -1) {
          arr.splice(index, 1);
        }
        project.images = arr.length > 0 ? JSON.stringify(arr) : "";
        await Project.update(project);
      }
    });
    return res.status(200).json({
      message: "Deleted successfully",
      data: {
        message: `Delete ID: ${id} is successfully. Blog, User and Project data (thumnail/avatar/images: ${id}) have removed!`,
      },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: any = async (req: any, res: any, next: any) => {
  const { enabled, title, description, subCategoryId } = req.fields;
  try {
    const newItem: any = await Media.create({
      src: req.file || "",
      enabled: enabled === "true",
      title,
      description,
      subCategoryId: Number(subCategoryId),
    });
    return res
      .status(201)
      .json({ message: "Created successfully", data: newItem });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const update: any = async (req: any, res: any, next: any) => {
  const { enabled, title, description, subCategoryId } = req.fields;
  const { id } = req.params;
  try {
    const updated: any = await Media.findOne({
      where: { key: "id", value: id },
    });
    if (updated) {
      updated.src = req.file || updated.src;
      updated.description = description;
      updated.title = title;
      updated.enabled = enabled;
      updated.subCategoryId = subCategoryId;
      await Media.update(id, updated);
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
