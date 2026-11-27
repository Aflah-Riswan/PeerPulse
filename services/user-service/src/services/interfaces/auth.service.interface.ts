import { RegisterUserDto, UserResponseDto } from "../../dtos/auth.dtos.js";

export interface IAuthService {
  register(input: RegisterUserDto): Promise<UserResponseDto>;
}
