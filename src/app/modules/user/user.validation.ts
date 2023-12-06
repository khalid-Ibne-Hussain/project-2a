import { z } from 'zod';

const FullNameValidationSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, 'First name should be at least 2 characters')
    .max(50, 'First name should be at most 50 characters')
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message:
        'First name should start with a capital letter and only contain lowercase letters.',
    }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, 'Last name should be at least 2 characters')
    .max(50, 'Last name should be at most 50 characters')
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message:
        'Last name should start with a capital letter and only contain lowercase letters.',
    }),
});

const AddressValidationSchema = z.object({
  street: z.string({ required_error: 'Street is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
});

const OrderValidationSchema = z.object({
  productName: z.string({ required_error: 'Product name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
});

const EmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

export const UserValidationSchema = z.object({
  userId: z.number({ required_error: 'User ID is required' }),
  username: z.string({ required_error: 'Username is required' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password should be at least 8 characters')
    .max(50, 'Password should be at most 50 characters'),
  fullName: FullNameValidationSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .refine((value) => EmailRegex.test(value), {
      message: 'Invalid email format',
    }),
  isActive: z.boolean({ required_error: 'isActive is required' }),
  hobbies: z.array(z.string({ required_error: 'Hobbies are required' })),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});

export default UserValidationSchema;
