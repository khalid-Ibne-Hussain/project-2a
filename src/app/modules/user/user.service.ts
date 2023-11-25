/* eslint-disable no-useless-catch */
import { TOrder, TUser } from './user.interface';
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

// add new product to order_______________________________
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addNewProductInOrderInDB = async (userId: number, orderData: TOrder) => {
  //   console.log(orderData);
  //   console.log(userId);
  const user = await User.findOne({ userId });

  console.log(user);

  if (!user) {
    console.log('1');
    throw new Error('User not found');
  }

  // check orders property exists, if not thn create
  if (!user.orders) {
    console.log('2');
    user.orders = [];
  }

  // Append the new order
  const abc = user.orders.push(orderData);
  //   console.log(user);
  console.log(abc);
  console.log('3');

  // Save the updated user
  await user.save();
  console.log(user.orders);

  // Return success response
  return {
    success: true,
    message: 'Order created successfully!',
    data: user.orders,
  };
};

// get orders by userID__________________________________
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

// get total price for specific id__________________________
const calculateTotalPriceForUserFromDB = async (userId: number) => {
  try {
    // Find the user by userId
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found.');
    }

    const totalPrice = user.orders
      ? user.orders.reduce(
          (total, order) => total + order.price * order.quantity,
          0,
        )
      : 0;

    return totalPrice;
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
  addNewProductInOrderInDB,
  getOrdersForUserFromDB,
  calculateTotalPriceForUserFromDB,
};
