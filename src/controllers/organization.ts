import { RequestHandler } from "express";
import { Organization } from "../models/organization";
import { Op } from "sequelize";
import { Project } from "../models/project";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Organization[] = await Organization.findAll();
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: Organization | null = await Organization.findByPk(id);
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
    const result: Organization[] = await Organization.findAll({
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
    await Organization.destroy({ where: { id } });
    await Project.destroy({ where: { organizationId: id } });
  
    return res.status(200).json({
      message: "Deleted successfully",
      data: { message: `Delete ID: ${id} is successfully. Project data (organizationId: ${id}) has removed!` },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: RequestHandler = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const newItem: Organization = await Organization.create({
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
    const updated: Organization | null = await Organization.findByPk(id);
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
