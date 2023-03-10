"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const skill_1 = __importDefault(require("./skill"));
const contact_1 = __importDefault(require("./contact"));
const blog_1 = __importDefault(require("./blog"));
const project_1 = __importDefault(require("./project"));
const media_1 = __importDefault(require("./media"));
const category_1 = __importDefault(require("./category"));
const subCategory_1 = __importDefault(require("./subCategory"));
const organization_1 = __importDefault(require("./organization"));
const rootRouter = express_1.default.Router();
rootRouter.use("/user", user_1.default);
rootRouter.use("/skill", skill_1.default);
rootRouter.use("/contact", contact_1.default);
rootRouter.use("/blog", blog_1.default);
rootRouter.use("/project", project_1.default);
rootRouter.use("/media", media_1.default);
rootRouter.use("/category", category_1.default);
rootRouter.use("/subCategory", subCategory_1.default);
rootRouter.use("/organization", organization_1.default);
exports.default = rootRouter;
