import fs from "fs";
import mkdirp from "mkdirp";

const isFileValid = (file: any) => {
  const type = file.src.mimetype.split("/").pop();
  const validTypes = ["jpg", "jpeg", "gif", "pdf", "png", "ogg", "mpeg"];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

const uploadImage = () => {
  mkdirp.sync("./public/images");
  const result: any = async (req: any, res: any, next: any) => {
    if (req.files && Object.keys(req.files).length) {
      if (!isFileValid(req.files)) {
        res.status(400).json({
          status: "Fail",
          message: "File type is not a valid type",
        });
      } else {
        var oldPath = req.files?.src.filepath;
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        var newPath =
          "./public/images/" +
          uniqueSuffix +
          "-" +
          req.files?.src.originalFilename;
        var rawData = fs.readFileSync(oldPath);
        await fs.writeFileSync(newPath, rawData);
        req.file =
          "http://localhost:3001/images/" +
          uniqueSuffix +
          "-" +
          req.files?.src.originalFilename;
        next();
      }
    } else {
      next();
    }
  };
  return result;
};
export default uploadImage;
