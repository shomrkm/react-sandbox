import './App.css'
import { useUsers } from './api/getAllUsers';

function App() {
  const { data }= useUsers();

  if (!data) return <div>Loading...</div>

  return (
    <>
      <h1 className='my-4'>Users</h1>
      {data.map((user) => (
        <div key={user.name}>
          { `${user.name} : ${user.age} `}
        </div>
      ))}
    </>
  );
}

export default App;
