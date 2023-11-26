import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { User } from './types';
const api = process.env.EXPO_PUBLIC_PHP_API_KEY;

// export const useNewUser = () => {
//   return useMutation({
//     mutationKey: ['user'],
//     mutationFn: async (values: User) => {
//       console.log(values);
//       const response =
//       return response.data;
//     },
//   });
// };
