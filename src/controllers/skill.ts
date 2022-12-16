import { RequestHandler } from "express";
import { ISkill } from "../models/index.model";
import { Skill } from "../services/index.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Array<ISkill> = await Skill.findAll({});
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: ISkill = await Skill.findOne({
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
    const result: Array<ISkill> = await Skill.findAll({
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
    await Skill.destroy({ where: { key: "id", value: id } });
    return res.status(200).json({
      message: "Deleted successfully",
      data: { message: `Delete ID: ${id} is successfully` },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: RequestHandler = async (req, res, next) => {
  const { name, description, rate } = req.body;
  try {
    const newItem: ISkill = await Skill.create({
      name,
      description,
      rate,
    });
    return res
      .status(201)
      .json({ message: "Created successfully", data: newItem });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const update: RequestHandler = async (req, res, next) => {
  const { name, description, rate } = req.body;
  const { id } = req.params;
  try {
    const updated: ISkill = await Skill.findOne({
      where: { key: "id", value: id },
    });
    if (updated) {
      updated.name = name || updated?.name;
      updated.description = description || updated?.description;
      updated.rate = rate || updated?.rate;
      await Skill.update(id, updated);
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
