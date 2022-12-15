import { RequestHandler } from "express";

const checkExist = (Model: any) => {
  const result: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await Model.findByPk(id);
      if (result) {
        next();
      } else {
        res.status(404).send({ message: `Not found by ID: ${id}` });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  return result;
};

export default checkExist;
