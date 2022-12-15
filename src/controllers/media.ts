import { RequestHandler } from "express";
import { Media } from "../models/media";
import { Op } from "sequelize";
import { SubCategory } from "../models/subCategory";
import { Category } from "../models/category";
import path from "path";
import { Blog } from "../models/blog";
import { User } from "../models/user";
import { Project } from "../models/project";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Media[] = await Media.findAll({
      include: [{ model: SubCategory, include: [Category] }],
    });
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: Media | null = await Media.findByPk(id, {
      include: [{ model: SubCategory, include: [Category] }],
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
    const result: Media[] = await Media.findAll({
      include: [{ model: SubCategory, include: [Category] }],
      where: {
        [Op.or]: [
          {
            title: {
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
    await Media.destroy({ where: { id } });
    await Blog.destroy({ where: { thumnail: id } });
    await User.destroy({ where: { avatar: id } });
    const projects = await Project.findAll({
      where: {
        images: {
          [Op.like]: `%${id}%`,
        },
      },
    });
    projects?.map(async (p: any) => {
      const project = await Project.findOne({
        where: {
          id: p.id,
        },
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
        await project.save();
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
    const newItem: Media = await Media.create({
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
    const updated: Media | null = await Media.findByPk(id);
    if (updated) {
      updated.src = req.file || updated.src;
      updated.description = description;
      updated.title = title;
      updated.enabled = enabled;
      updated.subCategoryId = subCategoryId;
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
