import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadImage,
  addCategory,
} from "../../../../features/category/categorySlice";

const AddCategory = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const imageUrl = useSelector((state) => state.category.imageUrl);

  const [newCategory, setNewCategory] = useState({
    name: "",
    status: true,
    image: null,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setNewCategory({ ...newCategory, image: e.target.files[0] });
  };

  const handleSave = () => {
    // Step 1: Upload the image
    dispatch(uploadImage(newCategory.image)).then((result) => {
      console.log("Image upload result:", result); // Check what is returned from the image upload
      if (result.payload && result.payload.fileUrl) {
        console.log("Image URL:", result.payload.fileUrl); // Ensure the URL is correct
        // Step 2: After image is uploaded, create the category with the image URL
        dispatch(
          addCategory({
            name: newCategory.name,
            isActive: newCategory.status,
            imageUrl: result.payload.fileUrl, // Use the correct file URL
          })
        );
        onHide(); // Close the modal
      } else {
        // Handle image upload failure
        console.error("Image upload failed");
      }
    });
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

          {/* Image Upload Field */}
          <Form.Group className="mb-3" controlId="categoryImage">
            <Form.Label>Category Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
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
