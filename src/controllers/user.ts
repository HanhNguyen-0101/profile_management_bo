import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, SubCategory, Media, Category } from "../services/index.service";
import { SECRET } from "../utils/constants";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const all: Array<any> = await User.findAll({
      include: [
        {
          model: SubCategory,
          as: "statusObj",
          map: "status",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: SubCategory,
          as: "resetPasswordStatusObj",
          map: "resetPasswordStatus",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Media,
          as: "avatarObj",
          map: "avatar",
          include: [
            {
              model: SubCategory,
              as: "subCategory",
              map: "subCategoryId",
              include: [{ model: Category, as: "category", map: "categoryId" }],
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
    const item = await User.findOne({
      where: { key: "id", value: id },
      include: [
        {
          model: SubCategory,
          as: "statusObj",
          map: "status",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: SubCategory,
          as: "resetPasswordStatusObj",
          map: "resetPasswordStatus",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Media,
          as: "avatarObj",
          map: "avatar",
          include: [
            {
              model: SubCategory,
              as: "subCategory",
              map: "subCategoryId",
              include: [{ model: Category, as: "category", map: "categoryId" }],
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
    const result: Array<any> = await User.findAll({
      where: { key: "email", value: keyword, like: true },
      include: [
        {
          model: SubCategory,
          as: "statusObj",
          map: "status",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: SubCategory,
          as: "resetPasswordStatusObj",
          map: "resetPasswordStatus",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Media,
          as: "avatarObj",
          map: "avatar",
          include: [
            {
              model: SubCategory,
              as: "subCategory",
              map: "subCategoryId",
              include: [{ model: Category, as: "category", map: "categoryId" }],
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
    await User.destroy({ where: { key: "id", value: id } });
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
    const newItem: any = await User.create({
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
    const updated: any = await User.findOne({
      where: { key: "id", value: id },
    });
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
      await User.update(id, updated);
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
      where: { key: "email", value: email },
      include: [
        {
          model: SubCategory,
          as: "statusObj",
          map: "status",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: SubCategory,
          as: "resetPasswordStatusObj",
          map: "resetPasswordStatus",
          include: [{ model: Category, as: "category", map: "categoryId" }],
        },
        {
          model: Media,
          as: "avatarObj",
          map: "avatar",
          include: [
            {
              model: SubCategory,
              as: "subCategory",
              map: "subCategoryId",
              include: [{ model: Category, as: "category", map: "categoryId" }],
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
      where: { key: "name", value: "user: waiting", like: true },
    });
    const resetPasswordStatus: any = await SubCategory.findOne({
      where: { key: "name", value: "request: none", like: true },
    });
    const newItem: any = await User.create({
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
    const user = await User.findOne({ where: { key: "email", value: email } });
    if (user) {
      const resetPasswordStatus: any = await SubCategory.findOne({
        where: { key: "name", value: "request: waiting", like: true },
      });
      user.resetPasswordStatus = resetPasswordStatus?.id;
      await User.update(user.id, user);
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
    const updated: any = await User.findOne({
      where: { key: "id", value: id },
    });
    if (updated) {
      const subCategory: any | null = await SubCategory.findOne({
        where: { key: "name", value: "img", like: true },
      });
      const media: any = await Media.create({
        src: req.file || "",
        enabled: true,
        title: "",
        description: "",
        subCategoryId: subCategory?.id,
      });
      updated.avatar = media.id;
      await SubCategory.update(updated.id, updated);
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
    const updated: any = await User.findOne({
      where: { key: "id", value: id },
    });
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
      await User.update(id, updated);
      return res.status(200).json({
        message: "Reset password successfully. Please send email to user!",
        data: updated,
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
