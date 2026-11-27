import z from "zod";
import { registerUserSchema } from "../validators/auth.validators.js";
import { UserRole } from "../types/user.types.js";
import { IUserDocument } from "../models/user.models.js";

export type RegisterUserDto = z.infer<typeof registerUserSchema>;

export interface UserResponseDto {
  id: string;
  fullName: string;
  email: string;
  roles: UserRole;
  emailVerified: boolean;
  avatarUrl: string;
  createdAt: Date;
}

export const toUserResponseDto = (user: IUserDocument): UserResponseDto => ({
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
  roles: user.roles,
  emailVerified: user.emailVerified,
  avatarUrl: user.avatarUrl ?? "",
  createdAt: user.createdAt
});
