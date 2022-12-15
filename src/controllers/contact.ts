import { RequestHandler } from "express";
import { Contact } from "../models/contact";
import { Op } from "sequelize";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Contact[] = await Contact.findAll();
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: Contact | null = await Contact.findByPk(id);
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
    const result: Contact[] = await Contact.findAll({
      where: {
        name: {
          [Op.like]: `%${keyword}%`,
        },
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
    await Contact.destroy({ where: { id } });
    return res.status(200).json({
      message: "Deleted successfully",
      data: { message: `Delete ID: ${id} is successfully` },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: RequestHandler = async (req, res, next) => {
  const { name, content } = req.body;
  try {
    const newItem: Contact = await Contact.create({
      name,
      content,
    });
    return res
      .status(201)
      .json({ message: "Created successfully", data: newItem });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const update: RequestHandler = async (req, res, next) => {
  const { name, content } = req.body;
  const { id } = req.params;
  try {
    const updated: Contact | null = await Contact.findByPk(id);
    if (updated) {
      updated.name = name || updated?.name;
      updated.content = content || updated?.content;
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
