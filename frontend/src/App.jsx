// src/App.js
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./utils/authContext";
import HomeScreen from "./screens/HomeScreen";
import AskForm from "./screens/AskForm";
import QuestionPage from "./screens/QuestionPage"

function App() {
  return (
    <AuthProvider>
      {/* Removed BrowserRouter here */}
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="/ask" element={<AskForm />} />
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;