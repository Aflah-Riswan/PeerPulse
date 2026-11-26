import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";
const startServer = async (): Promise<void> => {
  app.listen(env.PORT, () => {
    console.log("server is running on the port  : ", env.PORT);
  });
};
startServer();
