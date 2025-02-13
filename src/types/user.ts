export interface IUser {
    username: string;
    email: string;
    password: string;
    fullName: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: Date;
    country: string;
  }
  
  export interface IUserResponse extends Omit<IUser, 'password'> {
    id: string;
  }