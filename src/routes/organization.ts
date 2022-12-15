import express from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  findByKeyword,
} from "./../controllers/organization";
import authenticate from "../middlewares/validate/authenticate";
import checkExist from "../middlewares/validate/checkExist";
import { Organization } from "../services/index.service";

const router = express.Router();

router.post("/", authenticate(), create);
router.put("/:id", authenticate(), checkExist(Organization), update);
router.delete("/:id", authenticate(), checkExist(Organization), remove);
router.get("/", getAll);
router.get("/:id", checkExist(Organization), getById);
router.get("/keyword/:keyword", findByKeyword);

export default router;
