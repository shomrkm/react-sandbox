import useSWR from 'swr';
import { User } from '../types/user';

const BASE_URL = import.meta.env.VITE_API_URL;

const fetcher = async (url: string): Promise<User[]> => {
  console.log(BASE_URL)
  const response = await fetch(`${BASE_URL}${url}`);
  const data: User[] = await response.json();
  return data;
}

export const useUsers = () => {
  return useSWR<User[]>('/users', fetcher);
}
