import { Schema, model } from 'mongoose';
import { Address, FullName, Order, User } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
});

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: addressSchema,
  orders: { type: [orderSchema], required: true },
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// create custom static________________
userSchema.statics.isUserExists = async function (userId) {
  const existingUser = await UserModel.findOne({ userId });

  return existingUser;
};

// make model_______________
const UserModel = model<User>('User', userSchema);

export default UserModel;
