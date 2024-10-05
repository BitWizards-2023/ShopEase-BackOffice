import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const EditUser = ({ show, onHide, user, onSave }) => {
  // Initialize state with the passed user data
  const [editedUser, setEditedUser] = useState(user);

  // Sync the state with the user prop on initial load or when the modal reopens
  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  // Handle input changes for general fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Handle input changes for address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      address: { ...editedUser.address, [name]: value },
    });
  };

  // Handle saving the changes
  const handleSave = () => {
    onSave(editedUser);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Edit User - {editedUser?.firstName} {editedUser?.lastName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={editedUser.username || ""}
              onChange={handleInputChange}
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
                  value={editedUser.firstName || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={editedUser.lastName || ""}
                  onChange={handleInputChange}
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
              value={editedUser.email || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Phone Number */}
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={editedUser.phoneNumber || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Profile Picture URL */}
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control
              type="text"
              name="profile_pic"
              value={editedUser.profile_pic || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Role */}
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={editedUser.role || ""}
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
                  value={editedUser?.address?.street || ""}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={editedUser?.address?.city || ""}
                  onChange={handleAddressChange}
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
                  value={editedUser?.address?.state || ""}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={editedUser?.address?.postalCode || ""}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={editedUser?.address?.country || ""}
                  onChange={handleAddressChange}
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
