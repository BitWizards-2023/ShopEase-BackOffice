import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditProduct = ({ show, onHide, product, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedProduct);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedProduct?.name || ""}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={updatedProduct?.category || ""}
              onChange={handleInputChange}
              placeholder="Enter category"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={updatedProduct?.price || ""}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={updatedProduct?.image || ""}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productStatus">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Active"
              checked={updatedProduct?.status || false}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
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

export default EditProduct;
