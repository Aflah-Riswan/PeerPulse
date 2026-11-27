import { IUserDocument, UserModel } from "../../models/user.models.js";
import { CreateUserInput } from "../../types/user.types.js";
import { IUserRepository } from "../interface/user.repository.interface.js";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return UserModel.findOne({ email });
  }
  async findById(id: string): Promise<IUserDocument | null> {
    return UserModel.findById(id);
  }
  async create(data: CreateUserInput): Promise<IUserDocument> {
    return UserModel.create({
      fullName: data.fullName,
      email: data.email,
      passwordHashed: data.passwordHash
    });
  }
  async markEmailVerified(id: string): Promise<IUserDocument | null> {
    return UserModel.findByIdAndUpdate(id, { $set: { emailVerified: true } }, { new: true });
  }
}
