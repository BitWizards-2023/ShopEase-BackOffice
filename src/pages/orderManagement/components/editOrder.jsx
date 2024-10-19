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
import { updateOrderItem, cancelOrder } from "../../../features/orders/orderSlice"; // Import the thunk for cancelling orders

const EditOrder = ({ show, onHide, order }) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [isSaving, setIsSaving] = useState({}); // Loading state for individual items
  const [isCancelling, setIsCancelling] = useState(false); // Loading state for cancelling the order
  const [cancelReason, setCancelReason] = useState(""); // Store the reason for cancellation
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

  // Handle order cancellation
  const handleCancelOrder = async () => {
    setIsCancelling(true);

    try {
      // Dispatch the action to cancel the order via DELETE request
      await dispatch(cancelOrder({ orderId: updatedOrder.id, reason: cancelReason }));
      onHide(); // Close the modal once the order is canceled
    } catch (error) {
      console.error("Failed to cancel the order:", error);
    } finally {
      setIsCancelling(false);
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
              <strong>Total Amount:</strong> ${updatedOrder?.totalAmount || "0.00"}
            </p>
          </Col>
        </Row>
        <hr />
        {/* Cancelling Notes Section */}
        {updatedOrder?.internalNotes && updatedOrder.internalNotes.length > 0 && (
          <>
            <Row>
              <Col md={12}>
                <h5>Cancelling Notes</h5>
                <ListGroup>
                  {updatedOrder.internalNotes.map((note, index) => (
                    <ListGroup.Item key={index}>
                      <p>
                        <strong>Note:</strong> {note.note}
                      </p>
                      <p>
                        <strong>Added By:</strong> {note.addedBy}
                      </p>
                      <p>
                        <strong>Added At:</strong>{" "}
                        {new Date(note.addedAt).toLocaleString()}
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <hr />
          </>
        )}
        {/* Product Details Section */}
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
        <hr />
        {/* Cancel Order Section */}
        <Row>
          <Col md={12}>
            <h5>Cancel Order</h5>
            <Form.Group className="mb-3">
              <Form.Label>Reason for Cancellation</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter reason for cancellation"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="danger"
              onClick={handleCancelOrder}
              disabled={isCancelling || !cancelReason} // Disable button if cancellation is in progress or reason is empty
            >
              {isCancelling ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Cancelling...
                </>
              ) : (
                "Cancel Order"
              )}
            </Button>
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
