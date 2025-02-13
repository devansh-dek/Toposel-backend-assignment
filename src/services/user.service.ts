import jwt from 'jsonwebtoken';
import { IUser, IUserResponse } from '../types/user';
import { UserRepository } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/password';
import { config } from '../config/config';
import { IUserDocument } from '../models/user.model';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: "24h"
    });
  }

  private mapUserToResponse(user: IUserDocument): IUserResponse {
    const { _id, password, ...userData } = user.toObject();
    return { id: _id.toString(), ...userData };
  }

  async register(userData: IUser): Promise<{ user: IUserResponse; token: string }> {
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const existingEmail = await this.userRepository.findByEmail(userData.email);
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hashPassword(userData.password);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    const token = this.generateToken(user._id.toString());
    return { user: this.mapUserToResponse(user), token };
  }

  async login(username: string, password: string): Promise<{ user: IUserResponse; token: string }> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user._id.toString());
    return { user: this.mapUserToResponse(user), token };
  }

  async searchUsers(query: string): Promise<IUserResponse[]> {
    const users = await this.userRepository.search(query);
    return users.map(user => this.mapUserToResponse(user));
  }
}