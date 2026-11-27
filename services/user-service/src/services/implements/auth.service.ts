import bcrypt from "bcrypt";
import { RegisterUserDto, toUserResponseDto, UserResponseDto } from "../../dtos/auth.dtos.js";
import { AppError } from "../../errors/app-errors.js";
import { IUserRepository } from "../../repositories/interface/user.repository.interface.js";
import { IAuthService } from "../interfaces/auth.service.interface.js";
import { env } from "../../config/env.js";

export class AuthService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository) {}
  async register(input: RegisterUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new AppError("An account with this email is already existed ", 409);
    }
    const hashedPassword = await bcrypt.hash(input.password, env.BCRYPT_SALT_ROUNDS);
    const createdUser = await this.userRepository.create({
      fullName: input.fullName,
      email: input.fullName,
      passwordHash: hashedPassword
    });
    return toUserResponseDto(createdUser);
  }
}
