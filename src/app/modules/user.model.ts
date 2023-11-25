/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>({
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
//
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//
// userSchema.post('save', function (doc, next) {
//   const ordersArray = { orders: doc.orders };

//   Object.assign(doc, ordersArray);

//   next();
// });

// create custom static________________
userSchema.statics.isUserExists = async function (userId) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

// userSchema.pre('find', function (next)){
//     next();
// }

// make model_______________
export const User = model<TUser, UserModel>('User', userSchema);

// export default User;
