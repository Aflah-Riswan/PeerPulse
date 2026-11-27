import express, { Request, Response } from "express";

const app = express();

app.use("/health", (_req: Request, res: Response) => {
  res.json({ sucess: true, message: "Server is successfully running" });
});

export default app;
