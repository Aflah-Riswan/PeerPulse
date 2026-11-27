import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUserSchema } from "../validators/auth.validators.js";
import { AuthController } from "../controllers/implements/auth.controller.js";
import { AuthService } from "../services/implements/auth.service.js";
import { UserRepository } from "../repositories/implements/user.repository.js";

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
router.post("/register", validate(registerUserSchema), authController.register);

export default router;
