import express from "express";
import {
  create,
  update,
  remove,
  getAll,
  getById,
  findByKeyword,
  login,
  signup,
  resetPassword,
  uploadAvatar,
  requestResetPassword,
} from "./../controllers/user";
import authenticate from "../middlewares/validate/authenticate";
import uploadImage from "../middlewares/upload/uploadImage";
import checkExist from "../middlewares/validate/checkExist";
import { User } from "../services/index.service";
const formidableMiddleware = require("middleware-formidable");

const router = express.Router();

router.post("/", authenticate(), create);
router.post("/login", login);
router.post("/signup", signup);

router.put("/request/resetPassword", requestResetPassword);
router.put("/resetPassword/:id", authenticate(), checkExist(User), resetPassword);
router.put(
  "/uploadAvatar/:id",
  authenticate(),
  checkExist(User),
  formidableMiddleware({ multiples: true, allowEmptyFiles: true }),
  uploadImage(),
  uploadAvatar
);
router.put("/:id", authenticate(), checkExist(User), update);

router.get("/", getAll);
router.get("/:id", checkExist(User), getById);
router.get("/keyword/:keyword", findByKeyword);

router.delete("/:id", authenticate(), checkExist(User), remove);

export default router;
