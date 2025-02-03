import { FC, useActionState} from 'react';
import { useFormStatus } from 'react-dom';

import './App.css'
import { useProduct } from './api/useProduct';
import { Button, Spinner, Stocks } from './components';
import { ProductDetail } from './components/ProductDetail';

const BASE_URL = import.meta.env.VITE_API_URL;
const PRODUCT_ID = '1';

function App() {
  const { data, mutate: revalidate }= useProduct({ id: PRODUCT_ID });

  const [error, addToCartAction] = useActionState(async () => {
    const res = await fetch(`${BASE_URL}/products/${PRODUCT_ID}/add-to-cart`, { method: 'PATCH'});
    const json = await res.json()

    if(json.ok){
      revalidate();
    } else {
      return json.error;
    }
  }, null);

  if(!data) {
    return <Spinner size='xl' />
  }

  return (
    <div className='container mx-auto p-10'>
      <div className='flex gap-12 justify-between items-start mb-10'>
        <ProductDetail productId={PRODUCT_ID} />

        <form
          action={addToCartAction}
          className='flex-col justify-center items-center w-1/2'>
          <Button type='submit' className='w-full bg-yellow-300 mb-5 font-bold'>
            Add to Cart
          </Button>

          <div className='text-xl'>Your cart: {data.cart}</div>

          { error && <div className='text-red-500 mt-2'>{error}</div> }

          <Peiding>
            <Spinner className='mx-auto' />
          </Peiding>
        </form>
      </div>
      <Stocks productId={PRODUCT_ID} />
    </div>
  );
}

const Peiding: FC<{children: React.ReactNode}> = ({ children }) => {
  const { pending } = useFormStatus()

  return pending && children
}

export default App;
