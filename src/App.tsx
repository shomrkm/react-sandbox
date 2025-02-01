import './App.css'
import { useProduct } from './api/useProduct';

const PRODUCT_ID = '1';

function App() {
  const { data, isLoading }= useProduct({ id: PRODUCT_ID });

  if (isLoading) return <div>Loading...</div>
  if(!data) return <div>No data</div>

  return (
    <>
      <h1 className='my-4'>Product 1</h1>
      <div>
        <div>Cart: {data?.cart}</div>
        <div>Stocks: {data?.stocks}</div>
      </div>
    </>
  );
}

export default App;
