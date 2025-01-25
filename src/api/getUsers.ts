import useSWR from 'swr';
import { User } from '../types/user';

const fetcher = async (url: string): Promise<User[]> => {
  const response = await fetch(url);
  const data: User[] = await response.json();
  return data;
}

export const useUsers = () => {
  return useSWR<User[]>('http://localhost:3000/users', fetcher);
}
