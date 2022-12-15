import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../../utils/constants";
const authenticate = () => {
  const result: RequestHandler = async (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.split("Bearer ")[1] : "";
    try {
      const decoded = jwt.verify(token, SECRET);
      if (decoded) {
        next();
      } else {
        res.status(401).send({ message: "Please login" });
      }
    } catch (error) {
      res.status(401).send(error);
    }
  };
  return result;
};

export default authenticate;
