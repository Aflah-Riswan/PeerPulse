import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../../services/interfaces/auth.service.interface.js";
import { IAuthController } from "../interfaces/auth.controller.interface.js";
import { RegisterUserDto } from "../../dtos/auth.dtos.js";

export class AuthController implements IAuthController {
  constructor(private readonly authService: IAuthService) {}

   register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.register(req.body as RegisterUserDto);
      res.status(201).json({
        success: true,
        message: "User registered Successfully",
        data: user
      });
    } catch (error) {
      console.log("error found in auth controller : ", error);
      next(error);
    }
  }
}
