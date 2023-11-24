import { Model } from 'mongoose';

export type FullName = {
  firstName: string;
  lastName: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
};

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

// interface___________
export type User = {
  userId: number;
  username: string;
  password: string; // Hashed using bcrypt
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders: Order[];
};

export interface UserModel extends Model<User> {
  // isUserExists(id: string): Promise<User | null>;
}
