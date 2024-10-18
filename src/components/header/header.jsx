// components/header/Header.jsx
import React from "react";
import { Container, Dropdown, Image, Navbar } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { markAsRead } from "../../features/notification/notificationsSlice"; // Import the markAsRead action

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve notifications from Redux store
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  // Calculate the number of unread notifications
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  // Extract user information from the Redux store
  const user = useSelector((state) => state.auth.user);
  const userName = user ? `${user.firstName} ${user.lastName}` : "User";
  const userEmail = user?.email || "";
  const profileImage = user?.profile_pic || "https://via.placeholder.com/40";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Handle marking a notification as read
  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3 py-2">
      <Container fluid className="align-items-center justify-content-end">
        {/* Notification Dropdown */}
        <Dropdown align="end" className="me-3">
          <Dropdown.Toggle
            variant="light"
            id="dropdown-notifications"
            className="p-0"
          >
            <FaBell size={20} />
            {unreadCount > 0 && (
              <span className="badge bg-danger rounded-circle">
                {unreadCount}
              </span>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ minWidth: "300px" }}>
            <Dropdown.Header>Notifications</Dropdown.Header>
            {notifications.length === 0 ? (
              <Dropdown.ItemText>No new notifications.</Dropdown.ItemText>
            ) : (
              notifications.map((notif) => (
                <Dropdown.Item
                  key={notif.id}
                  onClick={() => handleMarkAsRead(notif.id)}
                  style={{
                    backgroundColor: notif.read ? "#f8f9fa" : "#e9ecef",
                  }}
                >
                  <strong>{notif.title}</strong>
                  <br />
                  <small>{notif.body}</small>
                </Dropdown.Item>
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
            <Dropdown.Item onClick={() => navigate("/user-profile")}>
              Profile Settings
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default Header;
