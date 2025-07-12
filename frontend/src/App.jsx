// src/App.js
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./utils/authContext";
import HomeScreen from "./screens/HomeScreen";
import AskForm from "./screens/AskForm";

function App() {
  return (
    <AuthProvider>
      {/* Removed BrowserRouter here */}
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="/ask" element={<AskForm />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;