import { Redis } from "ioredis";
import { env } from "../../config/env.js";

export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3
});

redisClient.on("connect", () => {
  console.log(" connecte to redis");
});
redisClient.on("error", (err) => {
  console.error("Error found in redis connecting : ", err);
});

export const disconnectRedis = async (): Promise<void> => {
  await redisClient.quit();
};
