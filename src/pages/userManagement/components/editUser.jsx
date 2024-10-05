import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const EditUser = ({ show, onHide, onSave, user }) => {
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "", // Include the password field for updating
    phoneNumber: "",
    profile_pic: "",
    role: "Vendor", // Default role
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  useEffect(() => {
    if (user) {
      setUpdatedUser(user); // Pre-fill the form with existing user details
    }
  }, [user]);

  // Handle input changes for general fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Handle input changes for address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      address: { ...updatedUser.address, [name]: value },
    });
  };

  // Handle saving the updated user
  const handleSave = () => {
    onSave(updatedUser); // Call the onSave function passed down from the parent
    onHide(); // Close modal after saving
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleInputChange}
              placeholder="Enter username"
            />
          </Form.Group>

          {/* First Name and Last Name */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={updatedUser.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={updatedUser.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={updatedUser.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
            />
          </Form.Group>

          {/* Phone Number */}
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={updatedUser.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </Form.Group>

          {/* Profile Picture URL */}
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control
              type="text"
              name="profile_pic"
              value={updatedUser.profile_pic}
              onChange={handleInputChange}
              placeholder="Enter profile picture URL"
            />
          </Form.Group>

          {/* Role */}
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={updatedUser.role}
              onChange={handleInputChange}
            >
              <option>Administrator</option>
              <option>Vendor</option>
              <option>CSR</option>
            </Form.Select>
          </Form.Group>

          {/* Address Fields */}
          <h5>Address Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={updatedUser.address.street}
                  onChange={handleAddressChange}
                  placeholder="Enter street"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={updatedUser.address.city}
                  onChange={handleAddressChange}
                  placeholder="Enter city"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={updatedUser.address.state}
                  onChange={handleAddressChange}
                  placeholder="Enter state"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={updatedUser.address.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Enter postal code"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={updatedUser.address.country}
                  onChange={handleAddressChange}
                  placeholder="Enter country"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUser;
