import { Button } from 'antd'
import { useAppDispath, useAppSelector } from './hooks/reduxHooks'
import {
  decrement,
  increment,
  incrementByAmount,
} from './store/reducers/counter'
import './App.css'

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispath()
  
  return (
    <div className="w-[200px] flex flex-wrap mx-auto">
      <h2 className="text-center text-lg font-bold text-indigo-600">{count}</h2>

      <Button onClick={() => dispatch(increment())}>InCrement</Button>
      <Button onClick={() => dispatch(decrement())}>DeCrement</Button>

      <Button onClick={() => dispatch(incrementByAmount(6))}>
        InCrement + 6
      </Button>
    </div>
  )
}

export default App
