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
exports.update = exports.create = exports.remove = exports.findByKeyword = exports.getById = exports.getAll = void 0;
const index_service_1 = require("../services/index.service");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield index_service_1.Media.findAll({
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "subCategory",
                    map: "subCategoryId",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
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
        const item = yield index_service_1.Media.findOne({
            where: { key: "id", value: id },
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "subCategory",
                    map: "subCategoryId",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
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
        const result = yield index_service_1.Media.findAll({
            include: [
                {
                    model: index_service_1.SubCategory,
                    as: "subCategory",
                    map: "subCategoryId",
                    include: [{ model: index_service_1.Category, as: "category", map: "categoryId" }],
                },
            ],
            where: {
                or: [
                    { where: { key: "title", value: keyword, like: true } },
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
        yield index_service_1.Media.destroy({ where: { key: "id", value: id } });
        yield index_service_1.Blog.destroy({ where: { key: "thumnail", value: id } });
        yield index_service_1.User.destroy({ where: { key: "avatar", value: id } });
        const projects = yield index_service_1.Project.findAll({
            where: { key: "images", value: id, like: true },
        });
        projects === null || projects === void 0 ? void 0 : projects.map((p) => __awaiter(void 0, void 0, void 0, function* () {
            const project = yield index_service_1.Project.findOne({
                where: { key: "id", value: p.id },
            });
            if (project &&
                project.images &&
                JSON.parse(project.images).includes(id)) {
                const arr = JSON.parse(project.images);
                const index = arr.indexOf(id);
                if (index !== -1) {
                    arr.splice(index, 1);
                }
                project.images = arr.length > 0 ? JSON.stringify(arr) : "";
                yield index_service_1.Project.update(project.id, project);
            }
        }));
        return res.status(200).json({
            message: "Deleted successfully",
            data: {
                message: `Delete ID: ${id} is successfully. Blog, User and Project data (thumnail/avatar/images: ${id}) have removed!`,
            },
        });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.remove = remove;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { enabled, title, description, subCategoryId } = req.fields;
    try {
        const newItem = yield index_service_1.Media.create({
            src: req.file || "",
            enabled: enabled === "true",
            title,
            description,
            subCategoryId: Number(subCategoryId),
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
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { enabled, title, description, subCategoryId } = req.fields;
    const { id } = req.params;
    try {
        const updated = yield index_service_1.Media.findOne({
            where: { key: "id", value: id },
        });
        if (updated) {
            updated.src = req.file || updated.src;
            updated.description = description;
            updated.title = title;
            updated.enabled = enabled;
            updated.subCategoryId = subCategoryId;
            yield index_service_1.Media.update(id, updated);
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
