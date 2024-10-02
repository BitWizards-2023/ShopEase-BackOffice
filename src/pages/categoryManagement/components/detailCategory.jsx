import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const CategoryDetails = ({ show, onHide, category }) => {
  if (!category) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{category.name} - Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12}>
            <h5>Category Name:</h5>
            <p>{category.name}</p>
            <h5>Status:</h5>
            <p>{category.status ? "Active" : "Inactive"}</p>
          </Col>
        </Row>
        <h5>Description:</h5>
        <p>{category.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryDetails;
