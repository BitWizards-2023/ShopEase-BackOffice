import React from "react";
import {
  Button,
  OverlayTrigger,
  Popover,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { FaBell } from "react-icons/fa";

const Notifications = ({ processingOrders }) => {
  // Popover content with order notifications
  const popover = (
    <Popover id="popover-notifications" className="glass-modal">
      {" "}
      {/* Apply glass modal class */}
      <Popover.Header as="h3">Order Notifications</Popover.Header>
      <Popover.Body>
        {processingOrders.length === 0 ? (
          <p>No orders are currently being processed.</p>
        ) : (
          <ListGroup variant="flush">
            {processingOrders.map((order) => (
              <ListGroup.Item key={order.id}>
                <FaBell className="me-2" />
                Order #{order.id} for {order.customerName} is being processed.
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popover}
      rootClose
    >
      <Button variant="link" className="ms-2 p-0 position-relative">
        <FaBell size={22} className="text-dark" />
        {processingOrders.length > 0 && (
          <Badge
            pill
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: "0.7rem" }}
          >
            {processingOrders.length}
          </Badge>
        )}
      </Button>
    </OverlayTrigger>
  );
};

export default Notifications;
