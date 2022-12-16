import { RequestHandler } from "express";
import { IProject } from "../models/index.model";
import {
  Project,
  SubCategory,
  Organization,
  Category,
} from "../services/index.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Array<IProject> = await Project.findAll({
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Organization,
          as: "organization",
          map: "organizationId",
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
    const item: IProject = await Project.findOne({
      where: { key: "id", value: id },
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Organization,
          as: "organization",
          map: "organizationId",
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
    const result: Array<IProject> = await Project.findAll({
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          map: "subCategoryId",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Organization,
          as: "organization",
          map: "organizationId",
        },
      ],
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
    await Project.destroy({ where: { key: "id", value: id } });
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
    const newItem: IProject = await Project.create({
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
    const updated: IProject = await Project.findOne({
      where: { key: "id", value: id },
    });
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
      await Project.update(id, updated);
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
