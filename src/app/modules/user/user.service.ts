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

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  //   console.log(result);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
