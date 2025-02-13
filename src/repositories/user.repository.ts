import { IUser, IUserResponse } from '../types/user';
import { UserModel, IUserDocument } from '../models/user.model';

export class UserRepository {
  async create(userData: IUser): Promise<IUserDocument> {
    const user = new UserModel(userData);
    return user.save();
  }

  async findByUsername(username: string): Promise<IUserDocument | null> {
    return UserModel.findOne({ username });
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return UserModel.findOne({ email });
  }

  async search(query: string): Promise<IUserDocument[]> {
    return UserModel.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    });
  }
}

