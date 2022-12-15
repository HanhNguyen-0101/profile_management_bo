import express from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  findByKeyword,
  getBySubCategoryId,
} from "./../controllers/blog";
import authenticate from "../middlewares/validate/authenticate";
import checkExist from "../middlewares/validate/checkExist";
import { Blog, SubCategory } from "../services/index.service";

const router = express.Router();

router.post("/", authenticate(), create);
router.put("/:id", authenticate(), checkExist(Blog), update);
router.delete("/:id", authenticate(), checkExist(Blog), remove);
router.get("/", getAll);
router.get("/:id", checkExist(Blog), getById);
router.get("/subCategoryId/:id", checkExist(SubCategory), getBySubCategoryId);
router.get("/keyword/:keyword", findByKeyword);

export default router;
