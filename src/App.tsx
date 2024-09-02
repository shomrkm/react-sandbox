import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      React Sandbox
      <h2>Counter</h2>
      <Counter count={count} onClick={() => setCount(prev => prev + 2)} />
      <h2>Child</h2>
      <Child name="John Doe" />
    </>
  )
}

type CounterProps = {
  count: number
  onClick: () => void
}

const Counter = ({ count, onClick }: CounterProps) => {
  
  return (
    <div>
      <button onClick={onClick}>Increment++</button>
      <div>{count}</div>
    </div>
  )
}

type ChildProps = {
  name: string;
}

const Child = ({ name }: ChildProps) => {
  return <div>{name}</div>
}

export default App
