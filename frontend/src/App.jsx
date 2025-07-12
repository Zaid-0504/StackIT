import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import HomeScreen from "./screens/HomeScreen"
import { AuthProvider } from "./utils/authContext"
import AskForm from "./screens/AskForm"


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/ask" element={<AskForm/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
