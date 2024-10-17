import React, { useState } from "react";
import { Container, Dropdown, Image, Navbar } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notifications] = useState([
    { id: 1, message: "Order #123 has been delivered." },
    { id: 2, message: "New user registered." },
    { id: 3, message: "Inventory running low." },
  ]);

  const user = useSelector((state) => state.auth.user);

  // Extract user information from the Redux store
  const userName = user ? `${user.firstName} ${user.lastName}` : "User";
  const userEmail = user?.email || "";
  const profileImage = user?.profile_pic || "https://via.placeholder.com/40";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3 py-2">
      <Container fluid className="align-items-center">
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
              src={profileImage}
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
