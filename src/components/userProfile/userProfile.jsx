import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Modal, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../features/userProfile/userProfileSlice";
import "./userProfile.css"; // Import custom CSS for Glassmorphism

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.userProfile);

  const [localUserData, setLocalUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    } else if (status === "succeeded" && user) {
      setLocalUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        // Set the given image URL as the default profile image
        profileImage:
          user.profile_pic ||
          "https://png.pngtree.com/png-clipart/20201208/ourmid/pngtree-male-user-avatar-free-png-image_2566766.png",
        role: user.role,
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          postalCode: user.address?.postalCode || "",
          country: user.address?.country || "",
        },
      });
    }
  }, [dispatch, status, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setLocalUserData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [fieldName]: value },
      }));
    } else {
      setLocalUserData({ ...localUserData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalUserData({ ...localUserData, profileImage: imageUrl });
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    dispatch(updateUserProfile(localUserData));
    // Add API call to save updated profile data here
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword === passwordData.confirmPassword) {
      // Handle the password update logic (API call) here
      setPasswordModal(false);
      alert("Password changed successfully!");
    } else {
      alert("Passwords do not match.");
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    localUserData && (
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

        {/* Profile Image Centered */}
        <Row className="justify-content-center mb-4">
          <Col md={4} className="d-flex justify-content-center">
            <Card className="text-center glass-card">
              <Card.Body>
                <Badge
                  bg="primary"
                  className="position-absolute"
                  style={{ top: "10px", right: "10px" }}
                >
                  {localUserData.role}
                </Badge>
                <img
                  src={localUserData.profileImage}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: "200px", height: "200px" }} // Increased size of the image
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
        </Row>

        {/* General and Address Details in the Same Row */}
        <Row>
          <Col md={6}>
            <Card className="glass-card">
              <Card.Body>
                <Card.Title>General Details</Card.Title>
                <Form>
                  <Form.Group controlId="firstName" className="mt-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={localUserData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group controlId="lastName" className="mt-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={localUserData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={localUserData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group controlId="phone" className="mt-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={localUserData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="glass-card">
              <Card.Body>
                <Card.Title>Address Details</Card.Title>
                <Form>
                  <Form.Group controlId="address.street" className="mt-3">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.street"
                      value={localUserData.address.street}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group controlId="address.city" className="mt-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.city"
                      value={localUserData.address.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group controlId="address.state" className="mt-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.state"
                      value={localUserData.address.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group controlId="address.postalCode" className="mt-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.postalCode"
                      value={localUserData.address.postalCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group controlId="address.country" className="mt-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.country"
                      value={localUserData.address.country}
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
    )
  );
};

export default UserProfile;
