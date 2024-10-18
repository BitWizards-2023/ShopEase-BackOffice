import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  ListGroup,
  Form,
  Spinner,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateOrderItem } from "../../../features/orders/orderSlice"; // Import the new thunk for updating order items

const EditOrder = ({ show, onHide, order }) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [isSaving, setIsSaving] = useState({}); // Loading state for individual items
  const dispatch = useDispatch();

  // Reset the displayed order data when a new order is selected
  useEffect(() => {
    setUpdatedOrder(order);
  }, [order]);

  // Handle product status change
  const handleProductStatusChange = (index, newStatus) => {
    const updatedItems = updatedOrder.items.map((item, i) =>
      i === index ? { ...item, status: newStatus } : item
    );
    setUpdatedOrder({ ...updatedOrder, items: updatedItems });
  };

  // Handle tracking number change
  const handleTrackingNumberChange = (index, trackingNumber) => {
    const updatedItems = updatedOrder.items.map((item, i) =>
      i === index ? { ...item, trackingNumber: trackingNumber } : item
    );
    setUpdatedOrder({ ...updatedOrder, items: updatedItems });
  };

  // Save the updated product status and tracking number for individual items
  const handleSaveItem = async (index) => {
    setIsSaving((prev) => ({ ...prev, [index]: true })); // Set saving state for the item

    const orderId = updatedOrder.id;
    const item = updatedOrder.items[index];
    const { status, trackingNumber, itemId } = item; // Ensure correct reference to itemId

    try {
      // Dispatch the action to update the individual order item via PUT request
      await dispatch(
        updateOrderItem({ orderId, itemId, status, trackingNumber })
      );
    } catch (error) {
      console.error("Failed to update order item:", error);
    } finally {
      setIsSaving((prev) => ({ ...prev, [index]: false })); // Reset saving state for the item
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Order Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12}>
            <h5>Customer Information</h5>
            <p>
              <strong>Customer Name:</strong>{" "}
              {updatedOrder?.customerName || "N/A"}
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <h5>Order Details</h5>
            <p>
              <strong>Order Number:</strong>{" "}
              {updatedOrder?.orderNumber || "N/A"}
            </p>
            <p>
              <strong>Total Amount:</strong> $
              {updatedOrder?.totalAmount || "0.00"}
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <h5>Product Details</h5>
            {updatedOrder?.items && updatedOrder.items.length > 0 ? (
              <ListGroup>
                {updatedOrder.items.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <p>
                      <strong>Product ID:</strong> {item.productId}
                    </p>
                    <p>
                      <strong>Product Name:</strong>{" "}
                      {item.productDetails?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Current Status:</strong> {item.status}
                    </p>
                    {/* Product Status Dropdown */}
                    <Form.Group className="mb-3">
                      <Form.Label>Change Status</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.status}
                        onChange={(e) =>
                          handleProductStatusChange(index, e.target.value)
                        }
                        disabled={isSaving[index]} // Disable the input while saving
                      >
                        <option value="Processing">Processing</option>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </Form.Control>
                    </Form.Group>
                    {/* Tracking Number Text Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Tracking Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter tracking number"
                        value={item.trackingNumber || ""}
                        onChange={(e) =>
                          handleTrackingNumberChange(index, e.target.value)
                        }
                        disabled={isSaving[index]} // Disable the input while saving
                      />
                    </Form.Group>
                    {/* Save Button for Each Product */}
                    <Button
                      variant="primary"
                      onClick={() => handleSaveItem(index)}
                      disabled={isSaving[index]}
                    >
                      {isSaving[index] ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No products in this order.</p>
            )}
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
};

export default EditOrder;
