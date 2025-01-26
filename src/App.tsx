import './App.css'
import { useAllUsers } from './api/useAllUsers';
import { Button } from './components/Button';
import { Spinner } from './components/Spinner';

function App() {
  const { data, isLoading }= useAllUsers();

  if (isLoading) return <Spinner />

  return (
    <div className="gap-2">
      <h1 className="my-4">Users</h1>
      {data?.map((user) => (
        <div key={user.name}>
          { `${user.name} : ${user.age} `}
        </div>
      ))}
      <Button className="my-2">Button</Button>
    </div>
  );
}

export default App;
