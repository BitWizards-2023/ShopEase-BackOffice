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
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown visibility
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
      <div className="d-flex align-items-center mb-4">
        <span className="h4">Shopear</span>
      </div>
      <hr />
      <Nav className="flex-column">
        <Nav.Link
          href="/dashboard"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link
          href="/user"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
        >
          <FaUser className="me-2" /> User Management
        </Nav.Link>
        <Nav.Link
          href="/product"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
        >
          <FaBoxes className="me-2" /> Products Management
        </Nav.Link>
        <Nav.Link
          href="/order"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
        >
          <FaClipboardList className="me-2" /> Order Management
        </Nav.Link>
        <Nav.Link
          href="/inventory"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
        >
          <FaWarehouse className="me-2" /> Inventory Management
        </Nav.Link>
        <Nav.Link
          href="/vendor"
          className="d-flex align-items-center py-2 text-dark sidebar-link mb-3"
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
        <span>Micheal Angelo</span>

        {/* Dropdown for settings without the default caret */}
        <Dropdown show={showDropdown} onToggle={() => {}} className="ms-4">
          {" "}
          {/* Add margin-start 3 */}
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
            <Dropdown.Item href="/profile">Profile Settings</Dropdown.Item>
            <Dropdown.Item href="/">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
