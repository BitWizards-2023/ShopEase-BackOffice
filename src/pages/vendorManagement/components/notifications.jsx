import React from "react";
import {
  Button,
  OverlayTrigger,
  Popover,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { FaBell } from "react-icons/fa";

const Notifications = ({ notifications }) => {
  // Popover content with notifications
  const popover = (
    <Popover id="popover-notifications" className="glass-modal">
      <Popover.Header as="h3">Notifications</Popover.Header>
      <Popover.Body>
        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          <ListGroup variant="flush">
            {notifications.map((item, index) => (
              <ListGroup.Item key={index}>
                <FaBell className="me-2" />
                {item.message}
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
        {notifications.length > 0 && (
          <Badge
            pill
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: "0.7rem" }}
          >
            {notifications.length}
          </Badge>
        )}
      </Button>
    </OverlayTrigger>
  );
};

export default Notifications;
