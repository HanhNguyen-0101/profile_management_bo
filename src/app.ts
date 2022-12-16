import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import rootRoutes from "./routes";

const PORT = 3001;

const app = express();
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(express.static('public'))

app.use("/api/v1", rootRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
