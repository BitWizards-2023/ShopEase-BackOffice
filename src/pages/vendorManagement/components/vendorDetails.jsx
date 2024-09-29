import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const VendorDetails = ({ show, onHide, vendor }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Vendor Details - {vendor.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          Average Ranking: {vendor.averageRanking}{" "}
          <FaStar className="text-warning" />
        </h5>
        <h6>Customer Comments:</h6>
        <ListGroup>
          {vendor.customerComments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <strong>{comment.user}:</strong> {comment.comment}{" "}
              <FaStar className="text-warning" /> {comment.ranking}
            </ListGroup.Item>
          ))}
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

export default VendorDetails;
