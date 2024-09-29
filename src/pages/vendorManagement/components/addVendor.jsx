import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddVendor = ({ show, onHide, onSave }) => {
  const [newVendor, setNewVendor] = useState({
    name: "",
    averageRanking: 0,
    customerComments: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({ ...newVendor, [name]: value });
  };

  const handleSave = () => {
    onSave(newVendor);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Vendor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Vendor Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newVendor.name}
              onChange={handleInputChange}
              placeholder="Enter vendor name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Vendor
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVendor;
