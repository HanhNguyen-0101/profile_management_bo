import express from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  findByKeyword,
} from "./../controllers/media";
import authenticate from "../middlewares/validate/authenticate";
import checkExist from "../middlewares/validate/checkExist";
import uploadImage from "../middlewares/upload/uploadImage";
import { Media } from "../services/index.service";
const formidableMiddleware = require("middleware-formidable");

const router = express.Router();

router.post(
  "/",
  authenticate(),
  formidableMiddleware({ multiples: true, allowEmptyFiles: true }),
  uploadImage(),
  create
);
router.put(
  "/:id",
  authenticate(),
  checkExist(Media),
  formidableMiddleware({ multiples: true, allowEmptyFiles: true }),
  uploadImage(),
  update
);
router.delete("/:id", authenticate(), checkExist(Media), remove);
router.get("/", getAll);
router.get("/:id", checkExist(Media), getById);
router.get("/keyword/:keyword", findByKeyword);

export default router;
