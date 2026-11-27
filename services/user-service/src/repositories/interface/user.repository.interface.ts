import { IUserDocument } from "../../models/user.models.js";
import { CreateUserInput } from "../../types/user.types.js";

export interface IUserRepository {
  findById(id: string): Promise<IUserDocument | null>;
  findByEmail(email: string): Promise<IUserDocument | null>;
  create(data: CreateUserInput): Promise<IUserDocument>;
  markEmailVerified(id: string): Promise<IUserDocument | null>;
}
