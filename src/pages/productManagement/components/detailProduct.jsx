import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const ProductDetails = ({ show, onHide, product }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{product.name} - Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: "100%" }}
            />
          </Col>
          <Col md={6}>
            <h5>Product Name:</h5>
            <p>{product.name}</p>
            <h5>Category:</h5>
            <p>{product.category}</p>
            <h5>Price:</h5>
            <p>${product.price}</p>
            <h5>Status:</h5>
            <p>{product.status ? "Active" : "Inactive"}</p>
          </Col>
        </Row>
        <h5>Description:</h5>
        <p>{product.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetails;
