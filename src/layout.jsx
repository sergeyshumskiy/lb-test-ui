import { Outlet } from 'react-router'
import './layout.css'

function App() {
  return (
    <div className='layout'>
      <Outlet />
    </div>
  )
}

export default App
