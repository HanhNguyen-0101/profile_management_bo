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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBySubCategoryId = exports.update = exports.create = exports.remove = exports.findByKeyword = exports.getById = exports.getAll = void 0;
const index_service_1 = require("../services/index.service");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield index_service_1.Blog.findAll({
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "subCategory",
                    map: "subCategoryId",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.Media,
                    as: "media",
                    map: "thumnail",
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
        const item = yield index_service_1.Blog.findOne({
            where: { key: "id", value: id },
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "subCategory",
                    map: "subCategoryId",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.Media,
                    as: "media",
                    map: "thumnail",
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
        const result = yield index_service_1.Blog.findAll({
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "subCategory",
                    map: "subCategoryId",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.Media,
                    as: "media",
                    map: "thumnail",
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
            where: {
                or: [
                    { where: { key: "title", value: keyword, like: true } },
                    { where: { key: "subTitle", value: keyword, like: true } },
                    { where: { key: "description", value: keyword, like: true } },
                ],
            },
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
        yield index_service_1.Blog.destroy({ where: { key: "id", value: id } });
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
    const { title, subTitle, description, content, thumnail, subCategoryId } = req.body;
    try {
        const newItem = yield index_service_1.Blog.create({
            title,
            subTitle,
            description,
            content,
            thumnail,
            subCategoryId,
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
    const { title, subTitle, description, content, thumnail, subCategoryId } = req.body;
    const { id } = req.params;
    try {
        const updated = yield index_service_1.Blog.findOne({
            where: { key: "id", value: id },
        });
        if (updated) {
            updated.title = title || (updated === null || updated === void 0 ? void 0 : updated.title);
            updated.subTitle = subTitle || (updated === null || updated === void 0 ? void 0 : updated.subTitle);
            updated.content = content || (updated === null || updated === void 0 ? void 0 : updated.content);
            updated.thumnail = thumnail || (updated === null || updated === void 0 ? void 0 : updated.thumnail);
            updated.subCategoryId = subCategoryId || (updated === null || updated === void 0 ? void 0 : updated.subCategoryId);
            updated.description = description;
            yield index_service_1.Blog.update(id, updated);
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
const getBySubCategoryId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const all = yield index_service_1.Blog.findAll({
            where: { key: "subCategoryId", value: id },
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "subCategory",
                    map: "subCategoryId",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
                {
                    model: index_service_1.Media,
                    as: "media",
                    map: "thumnail",
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
exports.getBySubCategoryId = getBySubCategoryId;
