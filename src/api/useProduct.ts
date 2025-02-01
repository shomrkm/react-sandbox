import useSWR from 'swr';
import { Product } from '../types/product';

const BASE_URL = import.meta.env.VITE_API_URL;

const fetcher = async (url: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}${url}`);
  const data: Product = await response.json();
  return data;
}

type Props = {
  id: string;
}

export const useProduct = ({id}: Props) => {
  return useSWR<Product>(`/products/${id}`, fetcher);
}
