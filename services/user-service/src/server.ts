import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./infrastructure/database/mongoose.js";

const startServer = async (): Promise<void> => {
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log("server is running on the port  : ", env.PORT);
  });
};
startServer();
