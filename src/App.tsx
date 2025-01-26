import './App.css'
import { useAllUsers } from './api/useAllUsers';

function App() {
  const { data, isLoading }= useAllUsers();

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <h1 className='my-4'>Users</h1>
      {data?.map((user) => (
        <div key={user.name}>
          { `${user.name} : ${user.age} `}
        </div>
      ))}
    </>
  );
}

export default App;
