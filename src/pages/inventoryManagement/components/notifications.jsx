import React from "react";
import {
  Button,
  OverlayTrigger,
  Popover,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { FaBell } from "react-icons/fa";

const Notifications = ({ lowStockItems }) => {
  // Popover content with low stock notifications
  const popover = (
    <Popover id="popover-notifications" className="glass-modal">
      {" "}
      {/* Apply glass modal class */}
      <Popover.Header as="h3">Low Stock Notifications</Popover.Header>
      <Popover.Body>
        {lowStockItems.length === 0 ? (
          <p>No low stock items at the moment.</p>
        ) : (
          <ListGroup variant="flush">
            {lowStockItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <FaBell className="me-2" />
                {item.name} is running low with only {item.stock} items.
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
        {lowStockItems.length > 0 && (
          <Badge
            pill
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: "0.7rem" }}
          >
            {lowStockItems.length}
          </Badge>
        )}
      </Button>
    </OverlayTrigger>
  );
};

export default Notifications;
