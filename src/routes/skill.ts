import express from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  findByKeyword,
} from "./../controllers/skill";
import { Skill } from "../models/skill";
import authenticate from "../middlewares/validate/authenticate";
import checkExist from "../middlewares/validate/checkExist";

const router = express.Router();

router.post("/", authenticate(), create);
router.put("/:id", authenticate(), checkExist(Skill), update);
router.delete("/:id", authenticate(), checkExist(Skill), remove);
router.get("/", getAll);
router.get("/:id", checkExist(Skill), getById);
router.get("/keyword/:keyword", findByKeyword);

export default router;
