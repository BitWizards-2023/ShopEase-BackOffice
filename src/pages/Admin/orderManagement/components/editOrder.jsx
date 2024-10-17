import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  ListGroup,
  Form,
  Spinner,
} from "react-bootstrap";

const EditOrder = ({ show, onHide, order, onSave }) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [isSaving, setIsSaving] = useState(false); // Loading state for Save

  // Reset the displayed order data when a new order is selected
  useEffect(() => {
    setUpdatedOrder(order);
  }, [order]);

  // Handle input changes for the status field
  const handleStatusChange = (e) => {
    const { value } = e.target;
    setUpdatedOrder({ ...updatedOrder, status: value });
  };

  // Save the updated order status
  const handleSave = () => {
    setIsSaving(true); // Show saving indicator
    // Simulate a delay to represent saving the changes
    setTimeout(() => {
      onSave(updatedOrder); // Call the parent function to save the updated status
      setIsSaving(false); // Hide saving indicator
      onHide(); // Close the modal
    }, 1000); // Simulate a 1-second delay for saving
  };

  return (
    <Modal show={show} onHide={onHide} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Order Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12}>
            <h5>Customer Information</h5>
            <p>
              <strong>Customer Name:</strong>{" "}
              {updatedOrder?.customerName || "N/A"}
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <h5>Order Details</h5>
            <p>
              <strong>Order Description:</strong>{" "}
              {updatedOrder?.details || "N/A"}
            </p>
            <p>
              <strong>Total Amount:</strong> $
              {updatedOrder?.totalAmount || "0.00"}
            </p>
          </Col>
        </Row>
        <hr />
        <h5>Order Status</h5>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={updatedOrder?.status || ""}
            onChange={handleStatusChange}
            disabled={isSaving} // Disable the input while saving
          >
            <option value="Processing">Processing</option>
            <option value="Partially Delivered">Partially Delivered</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isSaving}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrder;
