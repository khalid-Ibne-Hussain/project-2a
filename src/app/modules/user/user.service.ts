/* eslint-disable no-useless-catch */
import { TUser } from './user.interface';
import { User } from '../user.model';
// import UserModel  from './user.interface';

// create user
const createUserIntoDB = async (userData: TUser) => {
  //
  if (await User.isUserExists(userData.userId.toString())) {
    throw new Error('User already exists!');
  }

  const result = await User.create(userData);
  return result;
};

// get all users
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

// get data by id
const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  //   console.log(result);
  return result;
};

// update data____________________________________
const updateUserFromDB = async (userId: string, updatedUserData: TUser) => {
  const updatedUser = await User.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
    projection: { password: 0 },
  });

  if (!updatedUser) {
    // If user not found
    throw new Error('User not found for update.');
  }

  return updatedUser;
};

// delete user by id
const deleteUserFromDB = async (userId: string) => {
  const result = await User.deleteOne({ userId });

  return result.deletedCount === 1;
};

// add new product to order__________
const addProductToOrder = async (
  userId: number,
  orderData: { productName: string; price: number; quantity: number },
) => {
  try {
    // Find the user by userId
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found.');
    }

    // If the user already has an 'orders' array, append the new product
    if (user.orders && Array.isArray(user.orders)) {
      user.orders.push(orderData);
    } else {
      // If 'orders' array doesn't exist, create it and add the new product
      user.orders = [orderData];
    }

    // Save the updated user document
    await user.save();

    return null; // No specific data to return in this case
  } catch (error) {
    throw error;
  }
};

// get orders by userID__________
const getOrdersForUserFromDB = async (userId: number) => {
  try {
    // Find the user by userId
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found.');
    }

    const orders = user.orders || [];

    return orders;
  } catch (error) {
    throw error;
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addProductToOrder,
  getOrdersForUserFromDB,
};
