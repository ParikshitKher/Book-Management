import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginContext from "./context/Context";
import BookEdit from "./components/BookEdit";
import CreateBook from "./components/CreateBook";
import Signup from "./pages/Signup";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);
  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged, userId, setUserId }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<BookList />} />
            <Route path="/edit/:id" element={<BookEdit />} />
            <Route path="/add" element={<CreateBook />} />
          </Route>
        </Routes>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
