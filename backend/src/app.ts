import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import httpLogger from "./middlewares/archives/httpLogger.js";
import router from "./routes/index.js";
import { IS_PROD } from "./config/archives/env.js";
import logger from "./config/archives/logger.js";

const app: express.Express = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use("/api", router);

app.get("/", (_req, res) => {
  res
    .status(200)
    .json({
      message: `API running in ${IS_PROD ? "production" : "development"} mode`,
    });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err as any);
  const message = err instanceof Error ? err.message : "Internal Server Error";
  res.status(500).json({ error: message });
});

export default app;
