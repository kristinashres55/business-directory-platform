import "./App.css";
import Home from "./components/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BusinessProfile from "./pages/BusinessProfile/BusinessProfile";
import FinancialDashboard from "./pages/FinancialDashboard/FinancialDashboard";
import BusinessList from "./pages/BusinessList/BusinessList";
import Products from "./pages/Products/Products";
import Contact from "./pages/Contact/Contact";
import Footer from "./pages/Footer/Footer";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public layout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
              <BusinessList />
              <Products />
              <Contact />
              <Footer />
            </MainLayout>
          }
        />

        {/* Dashboard layout */}
        <Route
          path="/businesses"
          element={
            <DashboardLayout>
              <BusinessList />
            </DashboardLayout>
          }
        />
        <Route
          path="/products"
          element={
            <DashboardLayout>
              <Products />
            </DashboardLayout>
          }
        />
        <Route
          path="/financials"
          element={
            <DashboardLayout>
              <FinancialDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/businesses/:id"
          element={
            <DashboardLayout>
              <BusinessProfile />
            </DashboardLayout>
          }
        />
        <Route
          path="/user/profile"
          element={
            <DashboardLayout>
              <BusinessProfile />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
