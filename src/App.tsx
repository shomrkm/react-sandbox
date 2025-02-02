import { useState } from 'react';
import './App.css'
import { useProduct } from './api/useProduct';
import { Button, Stocks } from './components';

const BASE_URL = import.meta.env.VITE_API_URL;
const PRODUCT_ID = '1';

function App() {
  const { data, isLoading, mutate: revalidate }= useProduct({ id: PRODUCT_ID });
  const [error, setError] = useState('');

  const handleAddToCart = async () => {
    const res = await fetch(`${BASE_URL}/products/${PRODUCT_ID}/add-to-cart`, { method: 'PATCH'});
    const json = await res.json()

    if(!json.ok){
      setError(json.error)
      return;
    }

    setError('')
    revalidate()
  };

  if (isLoading) return <div>Loading...</div>
  if(!data) return <div>No data</div>

  return (
    <div className='container mx-auto p-10'>
      <div className='flex gap-4 justify-between items-start mb-10'>
        <div className='flex-col justify-start items-start border border-gray-200 p-4 rounded-md w-1/2'>
          <img src={`${BASE_URL}/images/1.png`} alt={data.name} style={{ width: '', objectFit: 'cover' }} />
          <div className='text-gray-500 text-3xl mt-2'>{data.name}</div>
        </div>
        <div className='flex-col justify-center items-center w-1/2'>
          <Button onClick={handleAddToCart} className='w-full bg-yellow-300 mb-5'>
            Add to Cart
          </Button>
          <div>Your cart: {data.cart}</div>
          { error && <div className='text-red-500 mt-2'>{error}</div> }
        </div>
      </div>
      <Stocks productId={PRODUCT_ID} />
    </div>
  );
}

export default App;
