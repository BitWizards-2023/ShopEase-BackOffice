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
  FaCheck,
} from "react-icons/fa";
import DatePicker from "react-datepicker"; // Make sure to install react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import AddOrder from "./components/addOrder"; // Separate Add Order component
import EditOrder from "./components/editOrder"; // Separate Edit Order component
import OrderDetails from "./components/detailOrder"; // Separate Order Details component
import CancelOrderModal from "./components/cancelOrder"; // Separate Cancel Order component
import MarkDeliveredModal from "./components/markDelivered"; // Separate Mark as Delivered component
import Notifications from "./components/notifications"; // Separate Notifications component
import OrderReports from "./components/orderReport"; // Order Reports component

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
      date: "2023-10-01",
      paymentStatus: "Pending",
      shippingAddress: "123 Main St, City, Country",
      history: [{ date: "2023-10-01", status: "Processing" }],
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
      date: "2023-09-15",
      paymentStatus: "Completed",
      shippingAddress: "456 Another St, City, Country",
      history: [
        { date: "2023-09-15", status: "Processing" },
        { date: "2023-09-20", status: "Partially Delivered" },
      ],
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
      date: "2023-08-10",
      paymentStatus: "Completed",
      shippingAddress: "789 Example Rd, City, Country",
      history: [
        { date: "2023-08-10", status: "Processing" },
        { date: "2023-08-12", status: "Delivered" },
      ],
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
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filtered orders based on search query, status, and date range
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toString().includes(searchQuery);
      const matchesStatus =
        filterStatus === "" || order.status === filterStatus;
      const matchesDateRange =
        (!startDate || new Date(order.date) >= startDate) &&
        (!endDate || new Date(order.date) <= endDate);

      return matchesSearch && matchesStatus && matchesDateRange;
    })
    .sort((a, b) => {
      if (sortBy === "dateAsc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "dateDesc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "amountAsc") return a.totalAmount - b.totalAmount;
      if (sortBy === "amountDesc") return b.totalAmount - a.totalAmount;
      return 0;
    });

  // Function to handle adding a new order
  const handleAddOrder = (newOrder) => {
    setOrders([...orders, { ...newOrder, id: orders.length + 1 }]);
    setShowAddModal(false); // Close the modal after adding the order
  };

  // Function to handle showing the Edit Order Modal
  const handleShowEditModal = (order) => {
    setEditOrder(order); // Set the selected order to edit
    setShowEditModal(true); // Show the edit modal
  };

  // Function to handle saving edited order
  const handleSaveEditOrder = (updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    setShowEditModal(false); // Close the edit modal after saving the order
  };

  // Function to handle canceling an order
  const handleCancelOrder = (orderId, cancelNote) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: "Canceled", cancelNote: cancelNote || "" }
          : order
      )
    );
    setShowCancelModal(false); // Close the cancel order modal after updating
  };

  // Function to handle marking an order or individual items as delivered
  const handleMarkAsDelivered = (orderId, productIndex = null) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          // If a specific product is being updated in a multi-vendor order
          if (productIndex !== null && order.products) {
            const updatedProducts = [...order.products];
            updatedProducts[productIndex].status = "Delivered";

            // Check if all products in the order are now delivered
            const allDelivered = updatedProducts.every(
              (product) => product.status === "Delivered"
            );

            return {
              ...order,
              status: allDelivered ? "Delivered" : "Partially Delivered",
              products: updatedProducts,
            };
          } else {
            // If the entire order is being marked as delivered
            return { ...order, status: "Delivered" };
          }
        }
        return order;
      })
    );
    setShowDeliveredModal(false); // Close the mark as delivered modal after updating
  };

  const handleShowDetailsModal = (order) => {
    setOrderDetails(order); // Set the selected order's details
    setShowDetailsModal(true); // Show the details modal
  };

  // UI for filtering and sorting
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
        {/* <div className="ms-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus className="me-2" />
            Add New Order
          </Button>
        </div> */}
      </h2>

      {/* Row of Cards for Important Information */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>
                <h3>{orders.length}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Processing Orders</Card.Title>
              <Card.Text>
                <h3>
                  {
                    orders.filter((order) => order.status === "Processing")
                      .length
                  }
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Delivered Orders</Card.Title>
              <Card.Text>
                <h3>
                  {
                    orders.filter((order) => order.status === "Delivered")
                      .length
                  }
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Canceled Orders</Card.Title>
              <Card.Text>
                <h3>
                  {orders.filter((order) => order.status === "Canceled").length}
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filter and Sort Controls */}
      <Row className="mb-3 d-flex align-items-center justify-content-between">
        <Col md={3}>
          <Form.Select
            aria-label="Filter by Status"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
            <option value="Partially Delivered">Partially Delivered</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            className="form-control"
          />
        </Col>
        <Col md={3}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            className="form-control"
          />
        </Col>
        <Col md={3}>
          <Form.Select
            aria-label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="">Sort By</option>
            <option value="dateAsc">Date (Asc)</option>
            <option value="dateDesc">Date (Desc)</option>
            <option value="amountAsc">Total Amount (Low to High)</option>
            <option value="amountDesc">Total Amount (High to Low)</option>
          </Form.Select>
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

      {/* Order Reports Section */}
      <OrderReports orders={orders} />

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
