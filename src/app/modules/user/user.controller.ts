/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './user.validation';
import { ZodError } from 'zod';
// import { TUser } from './user.interface';

// create user_____________________________
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // data validation __________________
    const validatedData = UserValidationSchema.parse(userData);

    // will call service func to send this data
    const result = await UserServices.createUserIntoDB(validatedData);

    // send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    if (err instanceof ZodError) {
      // Handle Zod validation errors
      const validationErrors = err.errors.map((error) => ({
        message: error.message,
        path: error.path.join('.'),
      }));

      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    } else {
      // Handle other types of errors
      //   console.error(err);

      const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
      const errorMessage = err.message || 'Internal Server Error';

      res.status(500).json({
        success: false,
        message: errorMessage,
        error: {
          code: errorCode,
          description: errorMessage,
        },
      });
    }
  }
};

// get all users____________________________
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Users not found!',
        error: {
          code: 404,
          destination: 'Users not found!',
        },
      });
      return;
    }

    // apply field filtering
    const filteredResult = result.map((user: any) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: filteredResult,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 500,
        description: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

// get single user___________________________
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);

    if (!result) {
      // If user is not found
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          destination: 'User not found!',
        },
      });
      return;
    }

    //   if user found
    // __________________field filtering
    const filteredResult = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };
    // __________________
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: filteredResult,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      error: {
        code: 500,
        description: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

// update user_________________________________________
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // console.log(userId);
    const updatedUserData = req.body; // Assuming the updated data is in the request body
    // console.log(updatedUserData);

    const updatedUser = await UserServices.updateUserFromDB(
      userId,
      updatedUserData,
    );
    console.log(updatedUser);

    if (!updatedUser) {
      // If the user was not found or not updated
      res.status(404).json({
        success: false,
        message: 'User not found or not updated!',
        error: {
          code: 404,
          description: 'User not found or not updated!',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      error: {
        code: 500,
        description: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

// delete user by userId
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const isUserDeleted = await UserServices.deleteUserFromDB(userId);

    if (!isUserDeleted) {
      // If user not found
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      error: {
        code: 500,
        description: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

// get order by userID________________
const getOrdersForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await UserServices.getOrdersForUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: {
        orders,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Error fetching orders.',
      error: {
        code: 404,
        description: 'USER_NOT_FOUND',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getOrdersForUser,
};
