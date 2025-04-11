import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import BusinessProfile from "./pages/BusinessProfile/BusinessProfile";
import MainLayout from "./layouts/MainLayout";
import FinancialDashboard from "./pages/FinancialDashboard/FinancialDashboard";
import BusinessList from "./pages/BusinessList/BusinessList";
import Products from "./pages/Products/Products";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* All routes with Navbar */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
              <BusinessList />
              <Products />
              {/* <Main /> */}
            </MainLayout>
          }
        />
        <Route
          path="/businesses/:id"
          element={
            <MainLayout>
              <BusinessProfile />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />

        <Route
          path="/businesses"
          element={
            <MainLayout>
              <BusinessList />
            </MainLayout>
          }
        />
        <Route
          path="/financials"
          element={
            <MainLayout>
              <FinancialDashboard />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
