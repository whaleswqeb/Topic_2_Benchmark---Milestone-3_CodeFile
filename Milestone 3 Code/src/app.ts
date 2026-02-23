import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import resourceRoutes from "./resources/resources.routes";
import eventRoutes from "./events/events.routes";
import logger from "./middleware/logger.middleware";
import { initializeMySqlConnector } from "./services/mysql.connector";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

(async () => {
  await initializeMySqlConnector();
})();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


if (process.env.NODE_ENV === "development") {
  app.use(logger);
  console.log(process.env.GREETING + " in dev mode");
}


app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Community Resource & Event Management API</h1>");
});


app.use("/api", resourceRoutes);
app.use("/api", eventRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
