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
const fs_1 = __importDefault(require("fs"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const constants_1 = require("../../utils/constants");
const isFileValid = (file) => {
    const type = file.src.mimetype.split("/").pop();
    const validTypes = ["jpg", "jpeg", "gif", "pdf", "png", "ogg", "mpeg"];
    if (validTypes.indexOf(type) === -1) {
        return false;
    }
    return true;
};
const uploadImage = () => {
    mkdirp_1.default.sync("./public/images");
    const result = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (req.files && Object.keys(req.files).length) {
            if (!isFileValid(req.files)) {
                res.status(400).json({
                    status: "Fail",
                    message: "File type is not a valid type",
                });
            }
            else {
                var oldPath = (_a = req.files) === null || _a === void 0 ? void 0 : _a.src.filepath;
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                var newPath = "./public/images/" +
                    uniqueSuffix +
                    "-" +
                    ((_b = req.files) === null || _b === void 0 ? void 0 : _b.src.originalFilename);
                var rawData = fs_1.default.readFileSync(oldPath);
                yield fs_1.default.writeFileSync(newPath, rawData);
                req.file = `${constants_1.DOMAIN}/images/${uniqueSuffix}-${(_c = req.files) === null || _c === void 0 ? void 0 : _c.src.originalFilename}`;
                next();
            }
        }
        else {
            next();
        }
    });
    return result;
};
exports.default = uploadImage;
