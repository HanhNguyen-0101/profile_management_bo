import express from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  findByKeyword,
} from "./../controllers/project";
import { Project } from "../models/project";
import authenticate from "../middlewares/validate/authenticate";
import checkExist from "../middlewares/validate/checkExist";

const router = express.Router();

router.post("/", authenticate(), create);
router.put("/:id", authenticate(), checkExist(Project), update);
router.delete("/:id", authenticate(), checkExist(Project), remove);
router.get("/", getAll);
router.get("/:id", checkExist(Project), getById);
router.get("/keyword/:keyword", findByKeyword);

export default router;
