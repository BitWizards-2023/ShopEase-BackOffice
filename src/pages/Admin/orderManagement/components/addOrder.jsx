import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddOrder = ({ show, onHide, onSave }) => {
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    totalAmount: "",
    status: "Processing",
    details: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleSave = () => {
    onSave(newOrder);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              name="customerName"
              value={newOrder.customerName}
              onChange={handleInputChange}
              placeholder="Enter customer name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="number"
              name="totalAmount"
              value={newOrder.totalAmount}
              onChange={handleInputChange}
              placeholder="Enter total amount"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Order Details</Form.Label>
            <Form.Control
              as="textarea"
              name="details"
              value={newOrder.details}
              onChange={handleInputChange}
              placeholder="Enter order details"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddOrder;
