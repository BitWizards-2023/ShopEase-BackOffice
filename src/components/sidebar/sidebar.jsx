import React, { useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaBoxes,
  FaClipboardList,
  FaUser,
  FaWarehouse,
  FaUsers,
  FaCog,
  FaBook,
  FaShoppingCart,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import permissions from "../../utils/ProtectedRoute/permissions";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCatalogueDropdown, setShowCatalogueDropdown] = useState(false);

  const token = useSelector((state) => state.auth.token);

  if (!token) {
    // User is not logged in
    return null;
  }

  let userRole;
  let userName;
  try {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
    userName = decodedToken.name;
  } catch (error) {
    return null;
  }

  const rolePermissions = permissions[userRole];

  if (!rolePermissions) {
    // Role not found in permissions map
    return null;
  }

  const allowedRoutes = rolePermissions.routes;

  // Map icon names to actual icon components
  const iconComponents = {
    FaTachometerAlt: <FaTachometerAlt className="me-2" />,
    FaBoxes: <FaBoxes className="me-2" />,
    FaClipboardList: <FaClipboardList className="me-2" />,
    FaUser: <FaUser className="me-2" />,
    FaWarehouse: <FaWarehouse className="me-2" />,
    FaUsers: <FaUsers className="me-2" />,
    FaBook: <FaBook className="me-2" />,
    FaShoppingCart: <FaShoppingCart className="me-2" />,
  };

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCatalogueToggle = () => {
    setShowCatalogueDropdown(!showCatalogueDropdown);
  };

  return (
    <div
      className="bg-light d-flex flex-column"
      style={{
        width: "250px",
        height: "100vh",
        padding: "10px",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center mb-4"
        style={{ textAlign: "center" }}
      >
        <span className="h4" style={{ fontSize: "2.2rem", fontWeight: "bold" }}>
          SHOPEASE
        </span>
      </div>

      <hr />
      <Nav className="flex-column">
        {allowedRoutes.map((routeObj) => {
          const { path, label, icon, parent } = routeObj;

          if (parent) {
            // Sub-route, will be handled in the dropdown
            return null;
          }

          // Handle the Catalogue Management dropdown
          if (path === "/catalogue") {
            return (
              <div key="catalogue">
                <Nav.Link
                  onClick={handleCatalogueToggle}
                  className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
                  style={{ cursor: "pointer", fontSize: "0.9rem" }}
                >
                  {iconComponents[icon]}
                  {label}
                  <span className="ms-auto" style={{ fontSize: "0.9rem" }}>
                    {showCatalogueDropdown ? "▲" : "▼"}
                  </span>
                </Nav.Link>
                {showCatalogueDropdown && (
                  <div className="ms-3">
                    {/* Render sub-routes under Catalogue Management */}
                    {allowedRoutes
                      .filter(
                        (subRouteObj) => subRouteObj.parent === "/catalogue"
                      )
                      .map((subRouteObj) => (
                        <Nav.Link
                          as={NavLink}
                          to={subRouteObj.path}
                          key={subRouteObj.path}
                          className="d-flex align-items-center py-2 text-dark sidebar-link mb-2"
                          style={{ fontSize: "0.85rem" }}
                          activeClassName="active"
                        >
                          {iconComponents[subRouteObj.icon]}
                          {subRouteObj.label || subRouteObj.path}
                        </Nav.Link>
                      ))}
                  </div>
                )}
              </div>
            );
          } else {
            // Regular navigation items
            return (
              <Nav.Link
                as={NavLink}
                to={path}
                key={path}
                className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
                style={{ fontSize: "0.9rem" }}
                activeClassName="active"
              >
                {iconComponents[icon]}
                {label || path}
              </Nav.Link>
            );
          }
        })}
      </Nav>
    </div>
  );
};

export default Sidebar;
