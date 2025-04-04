import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* This route renders Navbar + Home + Main */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Main />
            </>
          }
        />

        {/* Other individual pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
