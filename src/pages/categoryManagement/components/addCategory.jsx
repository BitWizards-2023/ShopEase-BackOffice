import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddCategory = ({ show, onHide, onSave }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    status: true,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSave = () => {
    onSave(newCategory);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoryDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={newCategory.description}
              onChange={handleInputChange}
              placeholder="Enter category description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoryStatus">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Active"
              checked={newCategory.status}
              onChange={(e) =>
                setNewCategory({ ...newCategory, status: e.target.checked })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategory;
