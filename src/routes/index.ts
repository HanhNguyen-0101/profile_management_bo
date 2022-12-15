import express from "express";
import userRoutes from "./user";
import skillRoutes from "./skill";
import contactRoutes from "./contact";
import blogRoutes from "./blog";
import projectRoutes from "./project";
import mediaRoutes from "./media";
import categoryRoutes from "./category";
import subCategoryRoutes from "./subCategory";
import organizationRoutes from "./organization";

const rootRouter = express.Router();

rootRouter.use("/user", userRoutes);
rootRouter.use("/skill", skillRoutes);
rootRouter.use("/contact", contactRoutes);
rootRouter.use("/blog", blogRoutes);
rootRouter.use("/project", projectRoutes);
rootRouter.use("/media", mediaRoutes);
rootRouter.use("/category", categoryRoutes);
rootRouter.use("/subCategory", subCategoryRoutes);
rootRouter.use("/organization", organizationRoutes);

export default rootRouter;