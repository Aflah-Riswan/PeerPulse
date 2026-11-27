const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
export const env = {
  PORT: Number(PORT),
  MONGO_URL
};
