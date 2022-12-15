import express from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  findByKeyword,
} from "./../controllers/subCategory";
import authenticate from "../middlewares/validate/authenticate";
import checkExist from "../middlewares/validate/checkExist";
import { SubCategory } from "../services/index.service";

const router = express.Router();

router.post("/", authenticate(), create);
router.put("/:id", authenticate(), checkExist(SubCategory), update);
router.delete("/:id", authenticate(), checkExist(SubCategory), remove);
router.get("/", getAll);
router.get("/:id", checkExist(SubCategory), getById);
router.get("/keyword/:keyword", findByKeyword);

export default router;
