import { RequestHandler } from "express";
import { IContact } from "../models/index.model";
import { Contact } from "../services/index.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Array<IContact> = await Contact.findAll({});
    return res.status(200).json({ message: "Fetched successfully", data: all });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: IContact = await Contact.findOne({
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
    const result: Array<IContact> = await Contact.findAll({
      where: { key: "name", value: keyword, like: true },
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
    await Contact.destroy({ where: { key: "id", value: id } });
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
    const newItem: IContact = await Contact.create({
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
    const updated: IContact = await Contact.findOne({
      where: { key: "id", value: id },
    });
    if (updated) {
      updated.name = name || updated?.name;
      updated.content = content || updated?.content;
      await Contact.update(id, updated);
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
