import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const OrderDetails = ({ show, onHide, order }) => {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details - {order.customerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <h5>Customer Name:</h5>
            <p>{order.customerName}</p>
          </Col>
          <Col md={6}>
            <h5>Total Amount:</h5>
            <p>${order.totalAmount}</p>
          </Col>
        </Row>
        <h5>Status:</h5>
        <p>{order.status}</p>
        <h5>Details:</h5>
        <p>{order.details}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetails;
