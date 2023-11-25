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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
};
