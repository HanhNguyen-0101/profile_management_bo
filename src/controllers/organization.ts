import { RequestHandler } from "express";
import { Organization, Project } from "../services/index.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Array<any> = await Organization.findAll({});
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: any = await Organization.findOne({
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
    const result: Array<any> = await Organization.findAll({
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
    await Organization.destroy({ where: { key: "id", value: id } });
    await Project.destroy({ where: { key: "organizationId", value: id } });

    return res.status(200).json({
      message: "Deleted successfully",
      data: {
        message: `Delete ID: ${id} is successfully. Project data (organizationId: ${id}) has removed!`,
      },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: RequestHandler = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const newItem: any = await Organization.create({
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
    const updated: any = await Organization.findOne({
      where: { key: "id", value: id },
    });
    if (updated) {
      updated.name = name || updated?.name;
      updated.description = description || updated?.description;
      await Organization.update(id, updated);
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
