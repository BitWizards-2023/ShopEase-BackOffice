import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditCategory = ({ show, onHide, category, onSave }) => {
  const [updatedCategory, setUpdatedCategory] = useState(category);

  useEffect(() => {
    setUpdatedCategory(category);
  }, [category]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedCategory);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedCategory?.name || ""}
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
              value={updatedCategory?.description || ""}
              onChange={handleInputChange}
              placeholder="Enter category description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoryStatus">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Active"
              checked={updatedCategory?.status || false}
              onChange={(e) =>
                setUpdatedCategory({
                  ...updatedCategory,
                  status: e.target.checked,
                })
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

export default EditCategory;
