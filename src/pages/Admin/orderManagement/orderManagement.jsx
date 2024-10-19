import React, { useEffect, useState } from "react";
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
import { FaEdit, FaTrash, FaEye, FaEllipsisV, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../features/orders/orderSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddOrder from "./components/addOrder";
import EditOrder from "./components/editOrder";
import OrderDetails from "./components/detailOrder";
import CancelOrderModal from "./components/cancelOrder";
import MarkDeliveredModal from "./components/markDelivered";
import OrderReports from "./components/orderReport";

export default function AdminOrderManagement({ userRole }) {
  const dispatch = useDispatch();
  const {
    orders = [],
    status,
    error,
  } = useSelector((state) => state.orders || {});

  // State management for modals and filters
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeliveredModal, setShowDeliveredModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch orders when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  // Filtered orders based on search query, status, and date range
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch = order.orderNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "" || order.status === filterStatus;
      const matchesDateRange =
        (!startDate || new Date(order.createdAt) >= startDate) &&
        (!endDate || new Date(order.createdAt) <= endDate);

      return matchesSearch && matchesStatus && matchesDateRange;
    })
    .sort((a, b) => {
      if (sortBy === "dateAsc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "dateDesc")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "amountAsc") return a.totalAmount - b.totalAmount;
      if (sortBy === "amountDesc") return b.totalAmount - a.totalAmount;
      return 0;
    });

  // Function to handle adding a new order
  const handleAddOrder = (newOrder) => {
    // Logic to add a new order, ideally through a Redux action or state update
    setShowAddModal(false);
  };

  // Function to show the Edit Order Modal
  const handleShowEditModal = (order) => {
    setEditOrder(order);
    setShowEditModal(true);
  };

  // Function to save the edited order
  const handleSaveEditOrder = (updatedOrder) => {
    // Logic to update the order, ideally through a Redux action
    setShowEditModal(false);
  };

  // Function to handle showing the order details modal
  const handleShowDetailsModal = (order) => {
    setOrderDetails(order);
    setShowDetailsModal(true);
  };

  // Function to cancel an order
  const handleCancelOrder = (orderId, cancelNote) => {
    // Dispatch the cancel action
    // Example: dispatch(cancelOrder({ id: orderId, note: cancelNote }));
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: "Canceled", cancelNote: cancelNote || "" }
          : order
      )
    );
    setShowCancelModal(false);
  };

  // Function to mark an order as delivered
  const handleMarkAsDelivered = (orderId, productIndex = null) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          if (productIndex !== null && order.items) {
            const updatedItems = [...order.items];
            updatedItems[productIndex].status = "Delivered";

            const allDelivered = updatedItems.every(
              (item) => item.status === "Delivered"
            );

            return {
              ...order,
              status: allDelivered ? "Delivered" : "Partially Delivered",
              items: updatedItems,
            };
          } else {
            return { ...order, status: "Delivered" };
          }
        }
        return order;
      })
    );
    setShowDeliveredModal(false);
  };

  return (
    <div>
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
              {status === "loading" ? (
                <p>Loading orders...</p>
              ) : status === "failed" ? (
                <p>Error: {error}</p>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Order Number</th>
                      <th>Total Amount</th>
                      <th>Payment Status</th>
                      <th>Order Status</th>
                      <th>Shipping Address</th>
                      <th>Order Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.orderNumber}</td>
                        <td>${order.totalAmount.toFixed(2)}</td>
                        <td>{order.paymentStatus}</td>
                        <td>{order.status}</td>
                        <td>
                          {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}
                        </td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>
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
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowCancelModal(true);
                                }}
                                disabled={
                                  order.status === "Delivered" ||
                                  order.status === "Canceled"
                                }
                              >
                                <FaTrash className="me-2" />
                                Cancel Order
                              </Dropdown.Item>
                            )}
                            {(userRole === "Administrator" ||
                              userRole === "CSR" ||
                              userRole === "Vendor") && (
                              <Dropdown.Item
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowDeliveredModal(true);
                                }}
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
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Order Reports Section */}
      <OrderReports orders={orders} /> {/* Pass orders as props */}
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
