import './App.css'
import { useProduct } from './api/useProduct';
import { Button, Stocks } from './components';

const PRODUCT_ID = '1';

function App() {
  const { data, isLoading }= useProduct({ id: PRODUCT_ID });

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
          <Button className='bg-yellow-300'>
            Add to Cart
          </Button>
        </div>
      </div>
      <Stocks productId={PRODUCT_ID} />
    </>
  );
}

export default App;
