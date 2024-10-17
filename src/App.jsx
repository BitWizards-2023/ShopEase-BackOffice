import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";
import LoginForm from "./components/login/login";
import SignupForm from "./components/signup/signup";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CSRDashboard from "./pages/CSR/CSRDashiboard";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import Unauthorized from "./components/unauthorized/Unauthorized";

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
  ];

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
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
