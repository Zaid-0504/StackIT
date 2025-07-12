import './App.css'
import { Routes, Route } from 'react-router-dom'
import StackIt from './screens/HomeScreen'
import AskForm from './screens/AskForm'

function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<StackIt/>} />
        <Route path="/ask" element={<AskForm />} />
     </Routes>
    </>
  )
}

export default App
