import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

const MarkDeliveredModal = ({ show, onHide, order, onDelivered }) => {
  if (!order) {
    return null; // Return nothing if no order is selected
  }

  const markDelivered = (index = null) => {
    onDelivered(order.id, index);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Mark as Delivered</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {order.isMultiVendor ? (
          <ListGroup>
            {order.products.map((product, index) => (
              <ListGroup.Item key={index}>
                {product.name} - {product.vendor} ({product.status})
                {product.status !== "Delivered" && (
                  <Button
                    variant="success"
                    size="sm"
                    className="ms-2"
                    onClick={() => markDelivered(index)}
                  >
                    Mark as Delivered
                  </Button>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>Are you sure you want to mark this order as delivered?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {!order.isMultiVendor && (
          <Button variant="success" onClick={() => markDelivered()}>
            Mark as Delivered
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MarkDeliveredModal;
