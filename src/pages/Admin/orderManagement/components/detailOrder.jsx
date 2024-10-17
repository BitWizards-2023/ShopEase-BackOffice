import React from "react";
import { Modal, Button, Row, Col, ListGroup } from "react-bootstrap";

const OrderDetails = ({ show, onHide, order }) => {
  if (!order) return null; // Return null if no order is selected

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Details - {order.customerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <h5>Customer Information:</h5>
            <p>
              <strong>Name:</strong> {order.customerName}
            </p>
            <p>
              <strong>Shipping Address:</strong>{" "}
              {order.shippingAddress || "Not Available"}
            </p>
          </Col>
          <Col md={6}>
            <h5>Payment Information:</h5>
            <p>
              <strong>Total Amount:</strong> ${order.totalAmount}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {order.paymentStatus || "Pending"}
            </p>
          </Col>
        </Row>
        <hr />
        <h5>Order Items:</h5>
        <ListGroup variant="flush">
          {order.products.map((product, index) => (
            <ListGroup.Item key={index}>
              <strong>Product:</strong> {product.name} <br />
              <strong>Vendor:</strong> {product.vendor} <br />
              <strong>Status:</strong> {product.status}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <hr />
        <h5>Order History:</h5>
        <ListGroup variant="flush">
          {order.history && order.history.length > 0 ? (
            order.history.map((entry, index) => (
              <ListGroup.Item key={index}>
                <strong>Date:</strong> {entry.date} - <strong>Status:</strong>{" "}
                {entry.status}
              </ListGroup.Item>
            ))
          ) : (
            <p>No order history available.</p>
          )}
        </ListGroup>
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
