import { RequestHandler } from "express";
import { Project } from "../models/project";
import { Op } from "sequelize";
import { SubCategory } from "../models/subCategory";
import { Organization } from "../models/organization";
import { Category } from "../models/category";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Project[] = await Project.findAll({
      include: [{model: SubCategory, include: [Category]}, Organization],
    });
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: Project | null = await Project.findByPk(id, {
      include: [{model: SubCategory, include: [Category]}, Organization],
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
    const result: Project[] = await Project.findAll({
      include: [{model: SubCategory, include: [Category]}, Organization],
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
    await Project.destroy({ where: { id } });
    return res.status(200).json({
      message: "Deleted successfully",
      data: { message: `Delete ID: ${id} is successfully` },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: RequestHandler = async (req, res, next) => {
  const {
    name,
    link,
    description,
    technical,
    date,
    members,
    images,
    organizationId,
    subCategoryId,
  } = req.body;
  try {
    const newItem: Project = await Project.create({
      name,
      link,
      description,
      technical,
      date,
      members,
      images,
      organizationId,
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
  const {
    name,
    link,
    description,
    technical,
    date,
    members,
    images,
    organizationId,
    subCategoryId,
  } = req.body;
  const { id } = req.params;
  try {
    const updated: Project | null = await Project.findByPk(id);
    if (updated) {
      updated.name = name || updated?.name;
      updated.description = description || updated?.description;
      updated.link = link || updated?.link;
      updated.technical = technical || updated?.technical;
      updated.date = date || updated?.date;
      updated.members = members || updated?.members;
      updated.images = images || updated?.images;
      updated.organizationId = organizationId || updated?.organizationId;
      updated.subCategoryId = subCategoryId || updated?.subCategoryId;
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
