import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const CancelOrderModal = ({ show, onHide, order, onCancel }) => {
  const [cancelNote, setCancelNote] = useState("");
  const [showError, setShowError] = useState(false);

  // Ensure the cancel note is reset when the modal is closed
  useEffect(() => {
    if (!show) {
      setCancelNote("");
      setShowError(false);
    }
  }, [show]);

  const handleCancel = () => {
    if (!cancelNote.trim()) {
      // Show error if the note is empty or just spaces
      setShowError(true);
      return;
    }

    // Call the onCancel function passed from the parent component
    onCancel(order.id, cancelNote);
    onHide(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Order #{order && order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {showError && (
            <Alert variant="danger">
              Please provide a reason for cancelling the order.
            </Alert>
          )}
          <Form.Group controlId="cancelNote">
            <Form.Label>Cancellation Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={cancelNote}
              onChange={(e) => setCancelNote(e.target.value)}
              placeholder="Please provide a reason for cancelling the order."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelOrderModal;
