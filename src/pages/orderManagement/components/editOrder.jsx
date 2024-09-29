import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EditOrder = ({ show, onHide, order, onSave }) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [error, setError] = useState(""); // For validation errors
  const [isSaving, setIsSaving] = useState(false); // Loading state for Save

  useEffect(() => {
    setUpdatedOrder(order);
  }, [order]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder({ ...updatedOrder, [name]: value });
  };

  // Validate and save the order
  const handleSave = () => {
    // Basic validation: check if all fields are filled out
    if (
      !updatedOrder?.customerName ||
      !updatedOrder?.totalAmount ||
      !updatedOrder?.details ||
      !updatedOrder?.status
    ) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear errors if no validation issue
    setIsSaving(true); // Set saving state

    // Simulate saving with a delay
    setTimeout(() => {
      onSave(updatedOrder); // Call the save function passed from the parent
      setIsSaving(false); // Turn off saving state
      onHide(); // Close the modal
    }, 1000); // Simulate save delay (1 second)
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Validation error alert */}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              name="customerName"
              value={updatedOrder?.customerName || ""}
              onChange={handleInputChange}
              placeholder="Enter customer name"
              disabled={isSaving} // Disable input when saving
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="number"
              name="totalAmount"
              value={updatedOrder?.totalAmount || ""}
              onChange={handleInputChange}
              placeholder="Enter total amount"
              disabled={isSaving} // Disable input when saving
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Order Details</Form.Label>
            <Form.Control
              as="textarea"
              name="details"
              value={updatedOrder?.details || ""}
              onChange={handleInputChange}
              placeholder="Enter order details"
              disabled={isSaving} // Disable input when saving
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={updatedOrder?.status || ""}
              onChange={handleInputChange}
              disabled={isSaving} // Disable input when saving
            >
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isSaving}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"} {/* Show saving state */}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrder;
