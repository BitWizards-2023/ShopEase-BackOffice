import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddProduct = ({ show, onHide, onSave }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    status: true,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSave = () => {
    onSave(newProduct);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Enter category"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productStatus">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Active"
              checked={newProduct.status}
              onChange={(e) =>
                setNewProduct({ ...newProduct, status: e.target.checked })
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

export default AddProduct;
