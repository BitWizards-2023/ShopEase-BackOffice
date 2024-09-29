import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
  Badge,
} from "react-bootstrap";
import { FaBell } from "react-icons/fa";

function NavScrollExample() {
  const [notifications] = useState([
    { id: 1, message: "Order #123 has been delivered." },
    { id: 2, message: "New user registered." },
    { id: 3, message: "Inventory running low." },
  ]);

  const popover = (
    <Popover id="popover-notifications" className="glass-modal">
      <Popover.Header as="h3">Notifications</Popover.Header>
      <Popover.Body>
        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id}>
              <p>{notif.message}</p>
              <hr />
            </div>
          ))
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        {/* Search Bar */}
        <Form className="d-flex me-auto" style={{ flex: 1 }}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="rounded-pill me-2"
            aria-label="Search"
            style={{ width: "100%", maxWidth: "300px" }} // Ensures proper width with round corners
          />
          <Button variant="outline-success" className="rounded-pill">
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
