import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>React Sandbox</h1>
      <h2>Counter</h2>
      <Counter count={count} onClick={() => setCount(prev => prev + 1)} />
      <h2>Child</h2>
      <Child name="John Doe" />
    </>
  )
}

type CounterProps = {
  count: number
  onClick: () => void
}

const useCounter = (initialValue: number) => {
  const [count, setCount] = useState(initialValue)

  const addCount = () => setCount(prev => prev + 1)
  const resetCount = () => setCount(0)

  return { count, addCount, resetCount }
}

const Counter = ({ count, onClick }: CounterProps) => {
  const { count: innerCount, addCount } = useCounter(0)

  return (
    <div>
      <div className="counter">
        <button onClick={onClick}>Increment++</button>
        <div>{count}</div>
      </div>
      <div className="counter">
        <button onClick={addCount}>Increment Inner++</button>
        <div>{innerCount}</div>
      </div>
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
