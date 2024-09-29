import React, { useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaEllipsisV,
  FaBell,
} from "react-icons/fa";
import AddOrder from "./components/addOrder"; // Separate Add Order component
import EditOrder from "./components/editOrder"; // Separate Edit Order component
import OrderDetails from "./components/detailOrder"; // Separate Order Details component
import CancelOrderModal from "./components/cancelOrder"; // Separate Cancel Order component
import MarkDeliveredModal from "./components/markDelivered"; // Separate Mark as Delivered component
import Notifications from "./components/notifications"; // Separate Notifications component

export default function OrderManagement({ userRole }) {
  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      totalAmount: 150,
      status: "Processing",
      details: "Order for 2 items: Laptop, Headphones.",
      isMultiVendor: true,
      products: [
        { name: "Laptop", vendor: "Vendor A", status: "Processing" },
        { name: "Headphones", vendor: "Vendor B", status: "Processing" },
      ],
    },
    {
      id: 2,
      customerName: "Jane Smith",
      totalAmount: 200,
      status: "Partially Delivered",
      details: "Order for 3 items: Smartphone, Tablet, Smartwatch.",
      isMultiVendor: true,
      products: [
        { name: "Smartphone", vendor: "Vendor A", status: "Delivered" },
        { name: "Tablet", vendor: "Vendor B", status: "Processing" },
        { name: "Smartwatch", vendor: "Vendor C", status: "Processing" },
      ],
    },
    {
      id: 3,
      customerName: "Alex Johnson",
      totalAmount: 75,
      status: "Delivered",
      details: "Order for 1 item: Headphones.",
      isMultiVendor: false,
      products: [
        { name: "Headphones", vendor: "Vendor A", status: "Delivered" },
      ],
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeliveredModal, setShowDeliveredModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Ensure selected order is initialized
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Add a new order
  const handleAddOrder = (newOrder) => {
    setOrders([...orders, { ...newOrder, id: orders.length + 1 }]);
  };

  // Edit an existing order
  const handleShowEditModal = (order) => {
    setEditOrder(order);
    setShowEditModal(true);
  };

  // View order details
  const handleShowDetailsModal = (order) => {
    setOrderDetails(order);
    setShowDetailsModal(true);
  };

  // Show cancel order modal
  const handleShowCancelModal = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  // Show mark as delivered modal
  const handleShowDeliveredModal = (order) => {
    setSelectedOrder(order);
    setShowDeliveredModal(true);
  };

  // Save edited order
  const handleSaveEditOrder = (updatedOrder) => {
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    setShowEditModal(false);
  };

  // Cancel an order
  const handleCancelOrder = (orderId, cancelNote) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: "Canceled", cancelNote } // Add the cancelNote to the order
          : order
      )
    );
    setShowCancelModal(false); // Close modal after cancel
  };

  // Mark an order as delivered
  const handleMarkAsDelivered = (orderId, productIndex = null) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === orderId) {
          if (productIndex !== null) {
            const updatedProducts = [...order.products];
            updatedProducts[productIndex].status = "Delivered";

            const allDelivered = updatedProducts.every(
              (product) => product.status === "Delivered"
            );

            return {
              ...order,
              status: allDelivered ? "Delivered" : "Partially Delivered",
              products: updatedProducts,
            };
          } else {
            return { ...order, status: "Delivered" };
          }
        }
        return order;
      });
    });
    setShowDeliveredModal(false);
  };

  // Calculate important statistics
  const totalOrders = orders.length;
  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;
  const canceledOrders = orders.filter(
    (order) => order.status === "Canceled"
  ).length;

  // Filtered orders based on search query
  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <h2 className="mb-4 d-flex align-items-center">
        <span className="me-2">Order Management</span>

        {/* Notifications Icon */}
        <Notifications
          processingOrders={orders.filter(
            (order) => order.status === "Processing"
          )}
        />

        {/* Add Order Button */}
        <div className="ms-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus className="me-2" />
            Add New Order
          </Button>
        </div>
      </h2>

      {/* Row of Cards for Important Information */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>
                <h3>{totalOrders}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Processing Orders</Card.Title>
              <Card.Text>
                <h3>{processingOrders}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Delivered Orders</Card.Title>
              <Card.Text>
                <h3>{deliveredOrders}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Canceled Orders</Card.Title>
              <Card.Text>
                <h3>{canceledOrders}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Order Listings Heading with Search Bar */}
      <Row className="mb-4 d-flex align-items-center justify-content-between">
        <Col md={6}>
          <h4>Order Listings</h4>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table for Order Listings */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Order Listings</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>${order.totalAmount}</td>
                      <td>{order.status}</td>
                      <td>
                        {/* Action Menu */}
                        <DropdownButton
                          variant="link"
                          title={<FaEllipsisV />}
                          id={`dropdown-${order.id}`}
                          align="end"
                        >
                          <Dropdown.Item
                            onClick={() => handleShowDetailsModal(order)}
                          >
                            <FaEye className="me-2" />
                            View Details
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleShowEditModal(order)}
                          >
                            <FaEdit className="me-2" />
                            Edit
                          </Dropdown.Item>
                          {(userRole === "Administrator" ||
                            userRole === "CSR") && (
                            <Dropdown.Item
                              onClick={() => handleShowCancelModal(order)}
                              disabled={
                                order.status === "Delivered" ||
                                order.status === "Canceled"
                              } // Disable cancel for delivered or already canceled orders
                            >
                              <FaTrash className="me-2" />
                              Cancel Order
                            </Dropdown.Item>
                          )}
                          {(userRole === "Administrator" ||
                            userRole === "CSR" ||
                            userRole === "Vendor") && (
                            <Dropdown.Item
                              onClick={() => handleShowDeliveredModal(order)}
                            >
                              <FaCheck className="me-2" />
                              Mark as Delivered
                            </Dropdown.Item>
                          )}
                        </DropdownButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Order Modal */}
      <AddOrder
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddOrder}
      />

      {/* Edit Order Modal */}
      <EditOrder
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        order={editOrder}
        onSave={handleSaveEditOrder}
      />

      {/* Order Details Modal */}
      <OrderDetails
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        order={orderDetails}
      />

      {/* Cancel Order Modal */}
      <CancelOrderModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        order={selectedOrder}
        onCancel={handleCancelOrder}
      />

      {/* Mark as Delivered Modal */}
      <MarkDeliveredModal
        show={showDeliveredModal}
        onHide={() => setShowDeliveredModal(false)}
        order={selectedOrder}
        onDelivered={handleMarkAsDelivered}
      />
    </div>
  );
}
