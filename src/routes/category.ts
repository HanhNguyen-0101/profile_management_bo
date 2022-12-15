import express from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  findByKeyword,
} from "./../controllers/category";
import authenticate from "../middlewares/validate/authenticate";
import checkExist from "../middlewares/validate/checkExist";
import { Category } from "../services/index.service";

const router = express.Router();

router.post("/", authenticate(), create);
router.put("/:id", authenticate(), checkExist(Category), update);
router.delete("/:id", authenticate(), checkExist(Category), remove);
router.get("/", getAll);
router.get("/:id", checkExist(Category), getById);
router.get("/keyword/:keyword", findByKeyword);

export default router;
