import React from "react";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";

export default function UserDetailModal({ show, onHide, user }) {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4} className="text-center">
            <Image
              src={user.profile_pic}
              alt={user.firstName}
              roundedCircle
              style={{ width: "100px", height: "100px" }}
            />
          </Col>
          <Col md={8}>
            <h5>{`${user.firstName} ${user.lastName}`}</h5>
            <p>
              <strong>Username: </strong>
              {user.username}
            </p>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <p>
              <strong>Phone Number: </strong>
              {user.phoneNumber}
            </p>
            <p>
              <strong>Role: </strong>
              {user.role}
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <h6>Address Information</h6>
            <p>
              <strong>Street: </strong>
              {user.address.street}
            </p>
            <p>
              <strong>City: </strong>
              {user.address.city}
            </p>
            <p>
              <strong>State: </strong>
              {user.address.state}
            </p>
            <p>
              <strong>Postal Code: </strong>
              {user.address.postalCode}
            </p>
            <p>
              <strong>Country: </strong>
              {user.address.country}
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
