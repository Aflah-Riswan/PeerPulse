const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
const REDIS_URL = process.env.REDIS_URL;
export const env = {
  PORT: Number(PORT),
  MONGO_URL,
  BCRYPT_SALT_ROUNDS: Number(BCRYPT_SALT_ROUNDS),
  REDIS_URL: String(REDIS_URL)
};
