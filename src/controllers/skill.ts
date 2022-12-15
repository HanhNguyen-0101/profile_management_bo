import { RequestHandler } from "express";
import { Skill } from "../models/skill";
import { Op } from "sequelize";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Skill[] = await Skill.findAll();
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: Skill | null = await Skill.findByPk(id);
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
    const result: Skill[] = await Skill.findAll({
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
    await Skill.destroy({ where: { id } });
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
    const newItem: Skill = await Skill.create({
      name,
      description,
      rate
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
    const updated: Skill | null = await Skill.findByPk(id);
    if (updated) {
      updated.name = name || updated?.name;
      updated.description = description || updated?.description;
      updated.rate = rate || updated?.rate;
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
