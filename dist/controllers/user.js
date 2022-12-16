"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.uploadAvatar = exports.requestResetPassword = exports.signup = exports.login = exports.update = exports.create = exports.remove = exports.findByKeyword = exports.getById = exports.getAll = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_service_1 = require("../services/index.service");
const constants_1 = require("../utils/constants");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield index_service_1.User.findAll({
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "statusObj",
                    map: "status",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.SubCategory,
                    as: "resetPasswordStatusObj",
                    map: "resetPasswordStatus",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.Media,
                    as: "avatarObj",
                    map: "avatar",
                    include: [
                        {
                            model: index_service_1.SubCategory,
                            as: "subCategory",
                            map: "subCategoryId",
                            include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                        },
                    ],
                },
            ],
        });
        return res.status(200).json({ message: "Fetched successfully", data: all });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.getAll = getAll;
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const item = yield index_service_1.User.findOne({
            where: { key: "id", value: id },
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "statusObj",
                    map: "status",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.SubCategory,
                    as: "resetPasswordStatusObj",
                    map: "resetPasswordStatus",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.Media,
                    as: "avatarObj",
                    map: "avatar",
                    include: [
                        {
                            model: index_service_1.SubCategory,
                            as: "subCategory",
                            map: "subCategoryId",
                            include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                        },
                    ],
                },
            ],
        });
        return res
            .status(200)
            .json({ message: "Fetched successfully", data: item });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.getById = getById;
const findByKeyword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.params;
    try {
        const result = yield index_service_1.User.findAll({
            where: { key: "email", value: keyword, like: true },
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "statusObj",
                    map: "status",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.SubCategory,
                    as: "resetPasswordStatusObj",
                    map: "resetPasswordStatus",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.Media,
                    as: "avatarObj",
                    map: "avatar",
                    include: [
                        {
                            model: index_service_1.SubCategory,
                            as: "subCategory",
                            map: "subCategoryId",
                            include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                        },
                    ],
                },
            ],
        });
        return res
            .status(200)
            .json({ message: "Found successfully", data: result });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.findByKeyword = findByKeyword;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield index_service_1.User.destroy({ where: { key: "id", value: id } });
        return res.status(200).json({
            message: "Deleted successfully",
            data: { message: `Delete ID: ${id} is successfully` },
        });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.remove = remove;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, avatar, status, resetPasswordStatus } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashPassword = bcryptjs_1.default.hashSync(password, salt);
    try {
        const newItem = yield index_service_1.User.create({
            email,
            password: hashPassword,
            avatar,
            status,
            resetPasswordStatus,
        });
        return res
            .status(201)
            .json({ message: "Created successfully", data: newItem });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.create = create;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, status, resetPasswordStatus, avatar } = req.body;
    const { id } = req.params;
    try {
        const updated = yield index_service_1.User.findOne({
            where: { key: "id", value: id },
        });
        if (updated) {
            updated.email = email || (updated === null || updated === void 0 ? void 0 : updated.email);
            updated.status = status || (updated === null || updated === void 0 ? void 0 : updated.status);
            updated.avatar = avatar || (updated === null || updated === void 0 ? void 0 : updated.avatar);
            updated.resetPasswordStatus =
                resetPasswordStatus || (updated === null || updated === void 0 ? void 0 : updated.resetPasswordStatus);
            if (password !== (updated === null || updated === void 0 ? void 0 : updated.password)) {
                const salt = bcryptjs_1.default.genSaltSync(10);
                const hashPassword = bcryptjs_1.default.hashSync(password, salt);
                updated.password = hashPassword;
            }
            else {
                updated.password = password;
            }
            yield index_service_1.User.update(id, updated);
            return res
                .status(200)
                .json({ message: "Updated successfully", data: updated });
        }
        else {
            exports.create;
        }
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.update = update;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield index_service_1.User.findOne({
            where: { key: "email", value: email },
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "statusObj",
                    map: "status",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.SubCategory,
                    as: "resetPasswordStatusObj",
                    map: "resetPasswordStatus",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.Media,
                    as: "avatarObj",
                    map: "avatar",
                    include: [
                        {
                            model: index_service_1.SubCategory,
                            as: "subCategory",
                            map: "subCategoryId",
                            include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                        },
                    ],
                },
            ],
        });
        if (user) {
            const isAuth = bcryptjs_1.default.compareSync(password, user.password);
            if (isAuth) {
                const { email, password } = user;
                const token = yield jsonwebtoken_1.default.sign({ email, password }, constants_1.SECRET, {
                    expiresIn: 60 * 60,
                });
                return res
                    .status(200)
                    .json({ message: "Login successfully", data: { user, token } });
            }
            else {
                return res.status(401).send({ message: "Password is wrong" });
            }
        }
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashPassword = bcryptjs_1.default.hashSync(password, salt);
    try {
        const status = yield index_service_1.SubCategory.findOne({
            where: { key: "name", value: "user: waiting", like: true },
        });
        const resetPasswordStatus = yield index_service_1.SubCategory.findOne({
            where: { key: "name", value: "request: none", like: true },
        });
        const newItem = yield index_service_1.User.create({
            email,
            password: hashPassword,
            avatar: null,
            status: status === null || status === void 0 ? void 0 : status.id,
            resetPasswordStatus: resetPasswordStatus === null || resetPasswordStatus === void 0 ? void 0 : resetPasswordStatus.id,
        });
        return res
            .status(201)
            .json({ message: "Signup successfully", data: newItem });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.signup = signup;
const requestResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield index_service_1.User.findOne({ where: { key: "email", value: email } });
        if (user) {
            const resetPasswordStatus = yield index_service_1.SubCategory.findOne({
                where: { key: "name", value: "request: waiting", like: true },
            });
            user.resetPasswordStatus = resetPasswordStatus === null || resetPasswordStatus === void 0 ? void 0 : resetPasswordStatus.id;
            yield index_service_1.User.update(user.id, user);
            return res.status(200).json({
                message: "Your request sent successfully! Please check your inbox",
                data: user,
            });
        }
        else {
            return res.status(404).send({ message: `Not found email: ${email}` });
        }
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.requestResetPassword = requestResetPassword;
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updated = yield index_service_1.User.findOne({
            where: { key: "id", value: id },
        });
        if (updated) {
            const subCategory = yield index_service_1.SubCategory.findOne({
                where: { key: "name", value: "img", like: true },
            });
            const media = yield index_service_1.Media.create({
                src: req.file || "",
                enabled: true,
                title: "",
                description: "",
                subCategoryId: subCategory === null || subCategory === void 0 ? void 0 : subCategory.id,
            });
            updated.avatar = media.id;
            yield index_service_1.User.update(updated.id, updated);
            return res
                .status(200)
                .json({ message: "Updated avatar successfully", data: updated });
        }
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.uploadAvatar = uploadAvatar;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, resetPasswordStatus } = req.body;
    const { id } = req.params;
    try {
        const updated = yield index_service_1.User.findOne({
            where: { key: "id", value: id },
        });
        if (updated) {
            updated.resetPasswordStatus =
                resetPasswordStatus || (updated === null || updated === void 0 ? void 0 : updated.resetPasswordStatus);
            if (password !== (updated === null || updated === void 0 ? void 0 : updated.password)) {
                const salt = bcryptjs_1.default.genSaltSync(10);
                const hashPassword = bcryptjs_1.default.hashSync(password, salt);
                updated.password = hashPassword;
            }
            else {
                updated.password = password;
            }
            yield index_service_1.User.update(id, updated);
            return res.status(200).json({
                message: "Reset password successfully. Please send email to user!",
                data: updated,
            });
        }
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.resetPassword = resetPassword;
