import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";
import LoginForm from "./components/login/login";
import SignupForm from "./components/signup/signup";
import AdminDashboard from "./pages/Admin/dashboard/AdminDashboard";
import CSRDashboard from "./pages/CSR/CSRDashiboard";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import Unauthorized from "./components/unauthorized/Unauthorized";
import AdminUserManagement from "./pages/Admin/userManagement/userManagement";
import AdminCategoryManagement from "./pages/Admin/categoryManagement/categoryManagement";
import AdminProductManagement from "./pages/Admin/productManagement/productManagement";
import AdminVendorManagement from "./pages/Admin/vendorManagement/vendorManagement";
import AdminInventoryManagement from "./pages/Admin/inventoryManagement/inventoryManagement";
import UserProfile from "./components/userProfile/userProfile";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromToken } from "./features/auth/authSlice";
import ProtectedRoute from "./utils/ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  const routes = [
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/vendor", element: <VendorDashboard /> },
    { path: "/csr", element: <CSRDashboard /> },
    { path: "/admin/user-management", element: <AdminUserManagement /> },
    { path: "/admin/category", element: <AdminCategoryManagement /> },
    { path: "/admin/product", element: <AdminProductManagement /> },
    { path: "/admin/vendor-management", element: <AdminVendorManagement /> },
    {
      path: "/admin/inventory-management",
      element: <AdminInventoryManagement />,
    },
  ];

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/*"
            element={
              <>
                <Sidebar />
                <div className="main-content">
                  <Header />
                  <div className="content-area">
                    <Routes>
                      {routes.map(({ path, element }) => (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <ProtectedRoute path={path}>
                              {element}
                            </ProtectedRoute>
                          }
                        />
                      ))}
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
