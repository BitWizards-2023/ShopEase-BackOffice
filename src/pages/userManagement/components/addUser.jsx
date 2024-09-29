import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddUser = ({ show, onHide, onSave }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Vendor", // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSave = () => {
    onSave(newUser);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              placeholder="Enter user name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option>Administrator</option>
              <option>Vendor</option>
              <option>CSR</option>
            </Form.Select>
          </Form.Group>
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
