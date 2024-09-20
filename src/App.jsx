import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./features/auth/authSlice";
import { ChatContextProvider } from "./components/context/chatContext";
import { AuthContext } from "./components/context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import Login from "./pages/Login";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
