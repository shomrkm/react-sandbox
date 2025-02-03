import { useProduct } from "../api/useProduct";

const BASE_URL = import.meta.env.VITE_API_URL;

type Props = {
  productId: string;
}

export const ProductDetail: React.FC<Props> = ({ productId }) => {

  const { data }= useProduct({ id: productId });

  if(!data) return <div>No data</div>

  return (
    <div className='flex-col justify-start items-start border border-gray-200 p-4 rounded-md w-1/2'>
      <img src={`${BASE_URL}/images/1.png`} alt={data.name} style={{ width: '', objectFit: 'cover' }} />
      <div className='text-gray-500 text-3xl mt-2'>{data.name}</div>
    </div>
  )
}