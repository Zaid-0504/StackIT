import './App.css'
import { Routes, Route } from 'react-router-dom'
import StackIt from './screens/HomeScreen'

function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<StackIt/>} />
     </Routes>
    </>
  )
}

export default App
