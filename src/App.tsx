import { useEffect, useState } from 'react'
import { getAllUsers } from './api/getUsers'
import './App.css'
import { User } from './types/user';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers().then(data => setUsers(data));
  }, []);

  return (
    <>
      <h1 className='my-4'>Users</h1>
      {users.map((user) => (
        <div key={user.name}>
          { `${user.name} : ${user.age} `}
        </div>
      ))}
    </>
  );
}

export default App;
