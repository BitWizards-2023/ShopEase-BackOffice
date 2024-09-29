import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";
import Dashboard from "./pages/dashboard/dashboard";
import User from "./pages/userManagement/userManagement";
import Product from "./pages/productManagement/productManagement";
import Order from "./pages/orderManagement/orderManagement";
import Inventory from "./pages/inventoryManagement/inventoryManagement";
import Vendor from "./pages/vendorManagement/vendorManagement";
import LoginForm from "./components/login/login"; // Import your LoginForm
import SignupForm from "./components/signup/signup"; // Import your SignupForm

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Show Sidebar and Header only for authenticated routes */}
        <Routes>
          {/* Login and Signup Routes */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Authenticated routes */}
          <Route
            path="/*"
            element={
              <>
                <Sidebar />
                <div className="main-content">
                  <Header />
                  <div className="content-area">
                    {/* Routing setup */}
                    <Routes>
                      {/* Default route that loads the Dashboard */}
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/user" element={<User />} />
                      <Route path="/product" element={<Product />} />
                      <Route path="/order" element={<Order />} />
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/vendor" element={<Vendor />} />
                    </Routes>
                  </div>
                  <Footer />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
