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
    <>
      <div className='flex gap-4 justify-around items-start h-40 mb-10'>
        <div className='flex-col justify-start items-start'>
          <img src='https://placehold.jp/150x150' alt='product' />
          <div className='text-gray-500 text-xl mt-2'>{data.name}</div>
        </div>
        <div className='flex-col justify-start'>
          <Button onClick={handleAddToCart} className='bg-yellow-300'>
            Add to Cart
          </Button>
          <div className='text-red-500 mt-2'>{error}</div>
        </div>
      </div>
      <Stocks productId={PRODUCT_ID} />
    </>
  );
}

export default App;
