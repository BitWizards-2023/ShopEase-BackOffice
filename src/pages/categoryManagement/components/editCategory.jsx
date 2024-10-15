import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateCategory, fetchCategories } from "../../../features/category/categorySlice"; // Import the update action

const EditCategory = ({ show, onHide, category }) => {
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedCategory(category);
  }, [category]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  const handleSave = async () => {
    const { id, name, isActive, imageUrl } = updatedCategory;

    try {
      // Dispatch the updateCategory action to update the category in the backend
      await dispatch(updateCategory({ id, name, isActive, imageUrl }));

      // After update, refetch the categories
      await dispatch(fetchCategories());

      // Call onSave only after the category is successfully updated
      // onSave(updatedCategory);

      // Hide the modal after successful save
      onHide();
    } catch (error) {
      console.error("Error updating the category: ", error);
    }
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
          <Form.Group className="mb-3" controlId="categoryImageUrl">
            <Form.Label>Category Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={updatedCategory?.imageUrl || ""}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoryStatus">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Active"
              checked={updatedCategory?.isActive || false}
              onChange={(e) =>
                setUpdatedCategory({
                  ...updatedCategory,
                  isActive: e.target.checked,
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
