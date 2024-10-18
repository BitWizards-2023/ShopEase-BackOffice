// components/admin/userManagement/components/AddUser.jsx

import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const AddUser = ({ show, onHide, onSave }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "", // Include password field for registration
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

  // Handle input changes for general fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle input changes for address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      address: { ...newUser.address, [name]: value },
    });
  };

  // Handle saving the new user
  const handleSave = () => {
    // Basic validation (optional)
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert("Please fill in all required fields.");
      return;
    }

    onSave(newUser); // Pass the new user data to the parent component for saving
    onHide(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label>
              Username <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
            />
          </Form.Group>

          {/* First Name and Last Name */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  First Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Last Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
          </Form.Group>

          {/* Phone Number */}
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={newUser.phoneNumber}
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
              value={newUser.profile_pic}
              onChange={handleInputChange}
              placeholder="Enter profile picture URL"
            />
          </Form.Group>

          {/* Role */}
          <Form.Group className="mb-3">
            <Form.Label>
              Role <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              required
            >
              <option>Admin</option>
              <option>Vendor</option>
              <option>CSR</option>
              <option>User</option>
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
                  value={newUser.address.street}
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
                  value={newUser.address.city}
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
                  value={newUser.address.state}
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
                  value={newUser.address.postalCode}
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
                  value={newUser.address.country}
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
          Save User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;
