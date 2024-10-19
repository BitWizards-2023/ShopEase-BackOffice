import React from "react";
import { Modal, Button, Row, Col, ListGroup, Image } from "react-bootstrap";

const OrderDetails = ({ show, onHide, order, onMarkDelivered }) => {
  if (!order) return null; // Return null if no order is selected

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Details - {order.orderNumber}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <h5>Customer Information:</h5>
            <p>
              <strong>Customer Name:</strong> {order.customerName || "N/A"}
            </p>
            <p>
              <strong>Shipping Address:</strong>{" "}
              {order.shippingAddress
                ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`
                : "Not Available"}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </Col>
          <Col md={6}>
            <h5>Payment Information:</h5>
            <p>
              <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {order.paymentStatus || "Pending"}
            </p>
            <p>
              <strong>Order Status:</strong> {order.status}
            </p>
          </Col>
        </Row>
        <hr />
        <h5>Order Items:</h5>
        <ListGroup variant="flush">
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={4}>
                    <Image
                      src={item.productDetails.images[0]}
                      alt={item.productDetails.name}
                      fluid
                    />
                  </Col>
                  <Col md={8}>
                    <p>
                      <strong>Product:</strong> {item.productDetails.name}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {item.productDetails.description}
                    </p>
                    <p>
                      <strong>Price:</strong> $
                      {item.productDetails.price.toFixed(2)}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Vendor ID:</strong> {item.vendorId}
                    </p>
                    <p>
                      <strong>Status:</strong> {item.status}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          ) : (
            <p>No items available for this order.</p>
          )}
        </ListGroup>
        <hr />
        <h5>Order History:</h5>
        <ListGroup variant="flush">
          {order.history && order.history.length > 0 ? (
            order.history.map((entry, index) => (
              <ListGroup.Item key={index}>
                <strong>Date:</strong>{" "}
                {new Date(entry.date).toLocaleDateString()} -{" "}
                <strong>Status:</strong> {entry.status}
              </ListGroup.Item>
            ))
          ) : (
            <p>No order history available.</p>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        {order.status !== "Delivered" && (
          <Button variant="success" onClick={() => onMarkDelivered(order.id)}>
            Mark as Delivered
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetails;
