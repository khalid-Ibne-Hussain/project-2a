import { TUser } from './user.interface';
import { User } from '../user.model';
// import UserModel  from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  //
  if (await User.isUserExists(userData.userId.toString())) {
    throw new Error('User already exists!');
  }

  const result = await User.create(userData);
  return result;
};

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
};
