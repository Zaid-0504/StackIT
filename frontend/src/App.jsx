import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import "./App.css"
import HomeScreen from "./screens/HomeScreen"
import { AuthProvider } from "./utils/authContext"


function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
