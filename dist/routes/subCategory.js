"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategory_1 = require("./../controllers/subCategory");
const authenticate_1 = __importDefault(require("../middlewares/validate/authenticate"));
const checkExist_1 = __importDefault(require("../middlewares/validate/checkExist"));
const index_service_1 = require("../services/index.service");
const router = express_1.default.Router();
router.post("/", (0, authenticate_1.default)(), subCategory_1.create);
router.put("/:id", (0, authenticate_1.default)(), (0, checkExist_1.default)(index_service_1.SubCategory), subCategory_1.update);
router.delete("/:id", (0, authenticate_1.default)(), (0, checkExist_1.default)(index_service_1.SubCategory), subCategory_1.remove);
router.get("/", subCategory_1.getAll);
router.get("/:id", (0, checkExist_1.default)(index_service_1.SubCategory), subCategory_1.getById);
router.get("/keyword/:keyword", subCategory_1.findByKeyword);
exports.default = router;
