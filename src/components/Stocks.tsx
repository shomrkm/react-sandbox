import { useProduct } from '../api/useProduct';
import { Button } from './Button'
import { MdOutlineRefresh } from "react-icons/md";

type Props = {
  productId: string;
}

export const Stocks: React.FC<Props> = ( { productId }) => {
  const { data, mutate, isLoading } = useProduct({ id: productId });

  const handleRefresh = async () => {
    mutate();
  };

  return (
    <div className="flex justify-around my-4 gap-4 bg-gray-100 rounded-md px-4 py-2">
      <div className="flex-col text-gray-600">
        <div className='text-2xl'>{data?.stocks}</div>
        <div>Stock</div>
      </div>
      <div className="flex-col text-gray-600 w-40">
        <div className='text-2xl'>{data?.cart}</div>
        <div>Cart</div>
      </div>
      <div className='flex justify-center items-center'>
        <Button onClick={handleRefresh} disabled={isLoading} prefixIcon={<MdOutlineRefresh />} className="text-gray-200">
          Refresh
        </Button>
      </div>
    </div>
  )
}