import express, { Request, Response } from "express";
import authRoutes from "../src/routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();

app.use(express.json());
app.use("/health", (_req: Request, res: Response) => {
  res.json({ sucess: true, message: "Server is successfully running" });
});
app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);

export default app;
