import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Row, Col, Modal, Card, Badge } from "react-bootstrap";
import "./userProfile.css"; // Import custom CSS for Glassmorphism

const UserProfile = () => {
  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // State for editing
  const [isEditing, setIsEditing] = useState(false);

  // State for user data, initialized with user from Redux or default values
  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    profileImage: user?.profile_pic || "https://via.placeholder.com/150",
    role: user?.role || "User",
  });

  // Update local state when the user data from Redux changes
  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        profileImage: user.profile_pic,
        role: user.role,
      });
    }
  }, [user]);

  // Password change state
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle profile details input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle image upload (dummy implementation)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, profileImage: imageUrl });
    }
  };

  // Save profile details (can be integrated with API later)
  const handleSaveProfile = () => {
    setIsEditing(false);
    // Add API call to save user data here
  };

  // Handle password change
  const handlePasswordChange = () => {
    if (passwordData.newPassword === passwordData.confirmPassword) {
      // Handle the password update logic (API call) here
      setPasswordModal(false);
      alert("Password changed successfully!");
    } else {
      alert("Passwords do not match.");
    }
  };

  // Password input change handler
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  return (
    <div className="container mt-4">
      {/* Header and Buttons */}
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>User Profile and Settings</h2>
        </Col>
        <Col className="text-end">
          {isEditing ? (
            <Button variant="primary" onClick={handleSaveProfile}>
              Save Profile
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
          <Button
            variant="warning"
            className="ms-3"
            onClick={() => setPasswordModal(true)}
          >
            Change Password
          </Button>
        </Col>
      </Row>

      <Row>
        {/* Profile Image Section in a Glassmorphism Card */}
        <Col md={4}>
          <Card className="text-center glass-card position-relative">
            <Card.Body>
              {/* User role tag in the top right corner */}
              <Badge
                bg="primary"
                className="position-absolute"
                style={{ top: "10px", right: "10px" }}
              >
                {userData.role}
              </Badge>
              <img
                src={userData.profileImage}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px" }}
              />
              {isEditing && (
                <div>
                  <Form.Group>
                    <Form.Label>Change Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Profile Details Form in a Glassmorphism Card */}
        <Col md={8}>
          <Card className="glass-card">
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group controlId="phone" className="mt-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Password Change Modal */}
      <Modal show={passwordModal} onHide={() => setPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
                placeholder="Enter current password"
              />
            </Form.Group>

            <Form.Group controlId="newPassword" className="mt-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                placeholder="Enter new password"
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                placeholder="Confirm new password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPasswordModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePasswordChange}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
