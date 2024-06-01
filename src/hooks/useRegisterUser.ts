// useRegisterMutation.tsx
import { useMutation } from '@tanstack/react-query';
import AuthService from '../services/authService'; // Assuming AuthService is in a file named authService.ts

type UserSchema = {
  username: string;
  email: string;
  password: string;
};

export const useRegisterUser = () => {
  return useMutation<{email: string, username: string, id: number}, Error, UserSchema>(
    async (user: UserSchema) => {
      return await AuthService.register(user.username, user.email, user.password);
    },
    {
      onSuccess: (data) => {
        console.log('User registered successfully:', data);
      },
      onError: (error) => {
        console.error('Registration failed:', error);
      },
    }
  );
};
