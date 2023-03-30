import { Button } from 'antd'
import { CiCircleFilled } from '@ant-design/icons'
import './App.css'

function App() {
  return (
    <div className='font-bold text-red-500 bg-[#ccc] h-screen w-screen'>
      <Button type="primary" className='flex items-center'>
        <CiCircleFilled size={16}/> Hello world!
      </Button>
    </div>
  )
}

export default App
