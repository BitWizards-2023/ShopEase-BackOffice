import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const CreateProduct = ({ onSave }) => {
  // Modal state
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    lowStock: "",
    price: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle Save action
  const handleSaveProduct = () => {
    onSave(newProduct); // Call the parent save function
    setShow(false); // Close the modal
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => setShow(true)}>
        <FaPlus className="me-2" />
        Add New Product
      </Button>

      {/* Add New Product Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
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
            <Form.Group className="mb-3" controlId="productStock">
              <Form.Label>Stock Level</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                placeholder="Enter stock level"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lowStockThreshold">
              <Form.Label>Low Stock Threshold</Form.Label>
              <Form.Control
                type="number"
                name="lowStock"
                value={newProduct.lowStock}
                onChange={handleInputChange}
                placeholder="Enter low stock threshold"
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateProduct;
