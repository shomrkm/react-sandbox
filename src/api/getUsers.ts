import { User } from '../types/user';

export const getAllUsers = async () => {
  const response = await fetch('http://localhost:3000/users')
  const data: User[] = await response.json()
  return data
}