import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types/user';

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: Date, required: true },
  country: { type: String, required: true }
}, {
  timestamps: true
});

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
