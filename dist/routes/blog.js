"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_1 = require("./../controllers/blog");
const authenticate_1 = __importDefault(require("../middlewares/validate/authenticate"));
const checkExist_1 = __importDefault(require("../middlewares/validate/checkExist"));
const index_service_1 = require("../services/index.service");
const router = express_1.default.Router();
router.post("/", (0, authenticate_1.default)(), blog_1.create);
router.put("/:id", (0, authenticate_1.default)(), (0, checkExist_1.default)(index_service_1.Blog), blog_1.update);
router.delete("/:id", (0, authenticate_1.default)(), (0, checkExist_1.default)(index_service_1.Blog), blog_1.remove);
router.get("/", blog_1.getAll);
router.get("/:id", (0, checkExist_1.default)(index_service_1.Blog), blog_1.getById);
router.get("/subCategoryId/:id", (0, checkExist_1.default)(index_service_1.SubCategory), blog_1.getBySubCategoryId);
router.get("/keyword/:keyword", blog_1.findByKeyword);
exports.default = router;
