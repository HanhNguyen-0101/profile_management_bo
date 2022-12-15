import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Op, Sequelize } from "sequelize";
import sequelize from "sequelize";
import { SECRET } from "../utils/constants";
import { SubCategory } from "../models/subCategory";
import { Media } from "../models/media";
import { Category } from "../models/category";
import path from "path";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: User[] = await User.findAll({
      include: [
        {
          model: SubCategory,
          as: "statusObj",
          include: [Category],
        },
        {
          model: SubCategory,
          as: "resetPasswordStatusObj",
          include: [Category],
        },
        {
          model: Media,
          as: "avatarObj",
          include: [
            {
              model: SubCategory,
              include: [Category],
            },
          ],
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
    const item = await User.findByPk(id, {
      include: [
        {
          model: SubCategory,
          as: "statusObj",
          include: [Category],
        },
        {
          model: SubCategory,
          as: "resetPasswordStatusObj",
          include: [Category],
        },
        {
          model: Media,
          as: "avatarObj",
          include: [
            {
              model: SubCategory,
              include: [Category],
            },
          ],
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
    const result: User[] = await User.findAll({
      where: {
        email: {
          [Op.like]: `%${keyword}%`,
        },
      },
      include: [
        {
          model: SubCategory,
          as: "statusObj",
          include: [Category],
        },
        {
          model: SubCategory,
          as: "resetPasswordStatusObj",
          include: [Category],
        },
        {
          model: Media,
          as: "avatarObj",
          include: [
            {
              model: SubCategory,
              include: [Category],
            },
          ],
        },
      ],
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
    await User.destroy({ where: { id } });
    return res.status(200).json({
      message: "Deleted successfully",
      data: { message: `Delete ID: ${id} is successfully` },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const create: RequestHandler = async (req, res, next) => {
  const { email, password, avatar, status, resetPasswordStatus } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const newItem: User = await User.create({
      email,
      password: hashPassword,
      avatar,
      status,
      resetPasswordStatus,
    });
    return res
      .status(201)
      .json({ message: "Created successfully", data: newItem });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const update: RequestHandler = async (req, res, next) => {
  const { email, password, status, resetPasswordStatus, avatar } = req.body;
  const { id } = req.params;
  try {
    const updated: User | null = await User.findByPk(id);
    if (updated) {
      updated.email = email || updated?.email;
      updated.status = status || updated?.status;
      updated.avatar = avatar || updated?.avatar;
      updated.resetPasswordStatus =
        resetPasswordStatus || updated?.resetPasswordStatus;
      if (password !== updated?.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        updated.password = hashPassword;
      } else {
        updated.password = password;
      }
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
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: SubCategory,
          as: "statusObj",
          include: [Category],
        },
        {
          model: SubCategory,
          as: "resetPasswordStatusObj",
          include: [Category],
        },
        {
          model: Media,
          as: "avatarObj",
          include: [
            {
              model: SubCategory,
              include: [Category],
            },
          ],
        },
      ],
    });
    if (user) {
      const isAuth = bcrypt.compareSync(password, user.password);
      if (isAuth) {
        const { email, password } = user;
        const token = await jwt.sign({ email, password }, SECRET, {
          expiresIn: 60 * 60,
        });
        return res
          .status(200)
          .json({ message: "Login successfully", data: { user, token } });
      } else {
        return res.status(401).send({ message: "Password is wrong" });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const signup: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const status: any | null = await SubCategory.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("name")),
        Sequelize.fn("lower", "user: waiting")
      ),
    });
    const resetPasswordStatus: SubCategory | null = await SubCategory.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("name")),
        Sequelize.fn("lower", "request: none")
      ),
    });
    const newItem: User = await User.create({
      email,
      password: hashPassword,
      avatar: null,
      status: status?.id,
      resetPasswordStatus: resetPasswordStatus?.id,
    });
    return res
      .status(201)
      .json({ message: "Signup successfully", data: newItem });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const requestResetPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const resetPasswordStatus: SubCategory | null = await SubCategory.findOne(
        {
          where: Sequelize.where(
            Sequelize.fn("lower", Sequelize.col("name")),
            Sequelize.fn("lower", "request: waiting")
          ),
        }
      );
      user.resetPasswordStatus = resetPasswordStatus?.id;
      await user.save();
      return res.status(200).json({
        message: "Your request sent successfully! Please check your inbox",
        data: user,
      });
    } else {
      return res.status(404).send({ message: `Not found email: ${email}` });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const uploadAvatar: any = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const updated: User | null = await User.findByPk(id);
    if (updated) {
      const subCategory: any | null = await SubCategory.findOne({
        where: Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("name")),
          Sequelize.fn("lower", "img")
        ),
      });
      const media: Media = await Media.create({
        src: req.file || "",
        enabled: true,
        title: "",
        description: "",
        subCategoryId: subCategory?.id,
      });
      updated.avatar = media.id;
      await updated.save();
      return res
        .status(200)
        .json({ message: "Updated avatar successfully", data: updated });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const resetPassword: RequestHandler = async (req, res) => {
  const { password, resetPasswordStatus } = req.body;
  const { id } = req.params;
  try {
    const updated: User | null = await User.findByPk(id);
    if (updated) {
      updated.resetPasswordStatus =
        resetPasswordStatus || updated?.resetPasswordStatus;
      if (password !== updated?.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        updated.password = hashPassword;
      } else {
        updated.password = password;
      }
      await updated.save();
      return res
        .status(200)
        .json({
          message: "Reset password successfully. Please send email to user!",
          data: updated,
        });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
