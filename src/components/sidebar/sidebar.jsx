import React, { useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaBoxes,
  FaClipboardList,
  FaUser,
  FaWarehouse,
  FaUsers,
  FaCog, // Settings icon
  FaBook, // New icon for Catalogue Management
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCatalogueDropdown, setShowCatalogueDropdown] = useState(false); // State for toggling Catalogue Management

  const handleToggle = () => {
    setShowDropdown(!showDropdown); // Toggle the settings dropdown visibility
  };

  const handleCatalogueToggle = () => {
    setShowCatalogueDropdown(!showCatalogueDropdown); // Toggle the catalogue dropdown visibility
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
        <Nav.Link
          href="/dashboard"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
          style={{ fontSize: "0.9rem" }} // Smaller font size
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link
          href="/user"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
          style={{ fontSize: "0.9rem" }} // Smaller font size
        >
          <FaUser className="me-2" /> User Management
        </Nav.Link>

        {/* Catalogue Management with sub-menus */}
        <div>
          <Nav.Link
            onClick={handleCatalogueToggle} // Toggle Catalogue submenu
            className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
            style={{ cursor: "pointer", fontSize: "0.9rem" }} // Smaller font size
          >
            <FaBook className="me-2" /> Catalogue Management
            <span className="ms-auto" style={{ fontSize: "0.9rem" }}>
              {showCatalogueDropdown ? "▲" : "▼"} {/* Up or Down arrow */}
            </span>
          </Nav.Link>
          {showCatalogueDropdown && (
            <div className="ms-3">
              <Nav.Link
                href="/category"
                className="d-flex align-items-center py-2 text-dark sidebar-link mb-2"
                style={{ fontSize: "0.85rem" }} // Even smaller for sub-menus
              >
                Category Management
              </Nav.Link>
              <Nav.Link
                href="/product"
                className="d-flex align-items-center py-2 text-dark sidebar-link mb-2"
                style={{ fontSize: "0.85rem" }} // Even smaller for sub-menus
              >
                Products Management
              </Nav.Link>
            </div>
          )}
        </div>

        <Nav.Link
          href="/order"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
          style={{ fontSize: "0.9rem" }} // Smaller font size
        >
          <FaClipboardList className="me-2" /> Order Management
        </Nav.Link>
        <Nav.Link
          href="/inventory"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
          style={{ fontSize: "0.9rem" }} // Smaller font size
        >
          <FaWarehouse className="me-2" /> Inventory Management
        </Nav.Link>
        <Nav.Link
          href="/vendor"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
          style={{ fontSize: "0.9rem" }} // Smaller font size
        >
          <FaUsers className="me-2" /> Vendor Management
        </Nav.Link>
      </Nav>

      {/* User Avatar at the Bottom with Settings Icon */}
      <div className="mt-auto d-flex align-items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="rounded-circle me-2"
        />
        <span style={{ fontSize: "0.9rem" }}>Micheal Angelo</span>

        {/* Dropdown for settings without the default caret */}
        <Dropdown show={showDropdown} onToggle={() => {}} className="ms-4">
          {" "}
          {/* Add margin-start */}
          <Dropdown.Toggle
            as="div" // Use div to fully control the toggle behavior and remove caret
            id="dropdown-settings"
            onClick={handleToggle} // Show/Hide dropdown on click
            className="p-0"
            style={{ cursor: "pointer" }} // Add pointer cursor for better UX
          >
            <FaCog size={18} className="text-dark" />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item href="/user-profile">Profile Settings</Dropdown.Item>
            <Dropdown.Item href="/">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
