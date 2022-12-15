import express from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  findByKeyword,
} from "./../controllers/contact";
import { Contact } from "../models/contact";
import authenticate from "../middlewares/validate/authenticate";
import checkExist from "../middlewares/validate/checkExist";

const router = express.Router();

router.post("/", authenticate(), create);
router.put("/:id", authenticate(), checkExist(Contact), update);
router.delete("/:id", authenticate(), checkExist(Contact), remove);
router.get("/", getAll);
router.get("/:id", checkExist(Contact), getById);
router.get("/keyword/:keyword", findByKeyword);

export default router;
