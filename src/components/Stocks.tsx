import { useProduct } from '../api/useProduct';
import { Button } from './Button'
import { MdOutlineRefresh } from "react-icons/md";

const BASE_URL = import.meta.env.VITE_API_URL;

type Props = {
  productId: string;
}

export const Stocks: React.FC<Props> = ( { productId }) => {
  const { data, mutate, isLoading } = useProduct({ id: productId });

  const handleUpdateStock = async (stocks: number) => {
    const res = await fetch(`${BASE_URL}/products/${productId}/stock`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stocks })
    });
    const json = await res.json()

    if(!json.ok){
      console.log(json.error)
      return;
    }

    mutate()
  }

  const handleRefresh = async () => {
    mutate();
  };

  if(!data) return <div>No data</div>

  return (
    <div className="flex justify-around my-4 gap-4 bg-gray-200 rounded-md px-4 py-2 text-gray-600">
      <div className="flex-col justify-center items-center text-gray-600">
        <div className='flex justify-center items-center gap-4'>
          <Button onClick={() => handleUpdateStock(data.stocks - 1)} className='bg-gray-100 text-md'>-</Button>
          <div className='text-2xl'>{data?.stocks}</div>
          <Button onClick={() => handleUpdateStock(data.stocks + 1)} className='bg-gray-100 text-md'>+</Button>
        </div>
        <div>Stock</div>
      </div>
      <div className="flex-col justify-center items-center text-gray-600">
        <div className='flex justify-center items-center gap-4'>
          <Button className='bg-gray-100 text-md'>-</Button>
          <div className='text-2xl'>{data?.cart}</div>
          <Button className='bg-gray-100 text-md'>+</Button>
        </div>
        <div>Cart</div>
      </div>
      <div className="flex-col justify-center items-center text-gray-600 w-40">
      </div>
      <div className='flex justify-center items-center'>
        <Button onClick={handleRefresh} disabled={isLoading} prefixIcon={<MdOutlineRefresh />} className="text-gray-100 bg-gray-300">
          Refresh
        </Button>
      </div>
    </div>
  )
}