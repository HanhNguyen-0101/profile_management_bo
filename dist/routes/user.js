"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./../controllers/user");
const authenticate_1 = __importDefault(require("../middlewares/validate/authenticate"));
const uploadImage_1 = __importDefault(require("../middlewares/upload/uploadImage"));
const checkExist_1 = __importDefault(require("../middlewares/validate/checkExist"));
const index_service_1 = require("../services/index.service");
const formidableMiddleware = require("middleware-formidable");
const router = express_1.default.Router();
router.post("/", (0, authenticate_1.default)(), user_1.create);
router.post("/login", user_1.login);
router.post("/signup", user_1.signup);
router.put("/request/resetPassword", user_1.requestResetPassword);
router.put("/resetPassword/:id", (0, authenticate_1.default)(), (0, checkExist_1.default)(index_service_1.User), user_1.resetPassword);
router.put("/uploadAvatar/:id", (0, authenticate_1.default)(), (0, checkExist_1.default)(index_service_1.User), formidableMiddleware({ multiples: true, allowEmptyFiles: true }), (0, uploadImage_1.default)(), user_1.uploadAvatar);
router.put("/:id", (0, authenticate_1.default)(), (0, checkExist_1.default)(index_service_1.User), user_1.update);
router.get("/", user_1.getAll);
router.get("/:id", (0, checkExist_1.default)(index_service_1.User), user_1.getById);
router.get("/keyword/:keyword", user_1.findByKeyword);
router.delete("/:id", (0, authenticate_1.default)(), (0, checkExist_1.default)(index_service_1.User), user_1.remove);
exports.default = router;
