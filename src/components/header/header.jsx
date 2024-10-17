// components/header/Header.jsx
import React, { useState } from "react";
import { Container, Form, Navbar, Dropdown, Image } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../../features/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const [notifications] = useState([
    { id: 1, message: "Order #123 has been delivered." },
    { id: 2, message: "New user registered." },
    { id: 3, message: "Inventory running low." },
  ]);

  // Get the token from Redux store
  const token = useSelector((state) => state.auth.token);

  let userName = "User";
  let userEmail = "";
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userName = decodedToken.name || "User";
      userEmail = decodedToken.email || "";
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    // Optionally redirect to login page
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3 py-2">
      <Container fluid className="align-items-center">
        {/* Notification Icon */}
        <Dropdown align="end" className="me-3">
          <Dropdown.Toggle
            variant="light"
            id="dropdown-notifications"
            className="p-0"
          >
            <FaBell size={20} />
            {notifications.length > 0 && (
              <span className="badge bg-danger rounded-circle">
                {notifications.length}
              </span>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ minWidth: "300px" }}>
            <Dropdown.Header>Notifications</Dropdown.Header>
            {notifications.length === 0 ? (
              <Dropdown.ItemText>No new notifications.</Dropdown.ItemText>
            ) : (
              notifications.map((notif) => (
                <Dropdown.ItemText key={notif.id}>
                  {notif.message}
                </Dropdown.ItemText>
              ))
            )}
          </Dropdown.Menu>
        </Dropdown>

        {/* Profile Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            id="dropdown-profile"
            className="d-flex align-items-center p-0"
          >
            <Image
              src="https://via.placeholder.com/40"
              roundedCircle
              className="me-2"
              width={40}
              height={40}
            />
            <span>{userName}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.ItemText>
              Signed in as <strong>{userEmail}</strong>
            </Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item href="/user-profile">Profile Settings</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default Header;
