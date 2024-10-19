import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  ProgressBar,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice"; // Import the fetch action
import Notifications from "./components/notifications";
import CreateProduct from "./components/createProduct";
import "./InventoryManagement.css";

const InventoryManagement = () => {
  const dispatch = useDispatch();

  // Fetch products from Redux store
  const {
    products = [],
    status: productStatus,
    error,
  } = useSelector((state) => state.products);

  // Search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products when the component mounts
  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts()); // Dispatch the action to fetch products
    }
  }, [dispatch, productStatus]);

  // Safeguard: Ensure products is an array
  const lowStockItems = products.filter(
    (item) => item.stockLevel <= item.lowStockThreshold && item.stockLevel > 0
  );
  const outOfStockItems = products.filter((item) => item.stockLevel === 0);
  const totalProducts = products.length;

  // Total stock value calculation
  const totalStockValue = products.reduce(
    (total, item) => total + item.stockLevel * item.price,
    0
  );

  // Filtered inventory based on search query
  const filteredInventory = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Heading with Notification and Add Product */}
      <h2 className="mb-4 d-flex align-items-center">
        <span>Inventory Management</span>

        {/* Notifications Component */}
        <Notifications lowStockItems={lowStockItems} />

        {/* Add New Product Component */}
        <div className="ms-auto">
          <CreateProduct />
        </div>
      </h2>

      {/* Row of Cards for Additional Information */}
      <Row className="mb-4">
        <Col md>
          <Card
            className="glass-card text-center"
            style={{ backgroundColor: "#e3f2fd" }}
          >
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>
                <h3>{totalProducts}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card
            className="glass-card text-center"
            style={{ backgroundColor: "#fff3cd" }}
          >
            <Card.Body>
              <Card.Title>Low Stock Products</Card.Title>
              <Card.Text>
                <h3>{lowStockItems.length}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card
            className="glass-card text-center"
            style={{ backgroundColor: "#f8d7da" }}
          >
            <Card.Body>
              <Card.Title>Out of Stock Products</Card.Title>
              <Card.Text>
                <h3>{outOfStockItems.length}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card
            className="glass-card text-center"
            style={{ backgroundColor: "#d4edda" }}
          >
            <Card.Body>
              <Card.Title>Total Stock Value</Card.Title>
              <Card.Text>
                <h3>${totalStockValue.toLocaleString()}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Inventory Levels Heading with Search Bar */}
      <Row className="mb-4 d-flex align-items-center justify-content-between">
        <Col md={6} className="d-flex align-items-center">
          <h4>Inventory Levels</h4>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>

      {/* Inventory Table */}
      <Row>
        <Col md={12}>
          {/* <Card className="mb-4">
            <Card.Body> */}
          {productStatus === "loading" ? (
            <p>Loading products...</p>
          ) : productStatus === "failed" ? (
            <p>Error: {error}</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th style={{ width: "10px" }}>Product Code</th>
                  <th style={{ width: "150px" }}>Product Name</th>
                  <th style={{ width: "10px" }}>Price</th>
                  <th style={{ width: "100px" }}>Stock Level</th>
                  <th style={{ width: "10px" }}>Low Stock Threshold</th>
                  <th style={{ width: "10px" }}>Featured</th>
                  <th style={{ width: "10px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ width: "10px" }}>{index + 1}</td>
                      <td style={{ width: "10px" }}>{item.productCode}</td>
                      <td style={{ width: "150px" }}>{item.name}</td>
                      <td style={{ width: "10px" }}>${item.price}</td>
                      <td style={{ width: "100px" }}>{item.stockLevel}</td>
                      <td style={{ width: "10px" }}>
                        {item.lowStockThreshold}
                      </td>
                      <td style={{ width: "10px" }}>
                        {item.isFeatured ? (
                          <span className="text-success">Yes</span>
                        ) : (
                          <span className="text-danger">No</span>
                        )}
                      </td>
                      <td style={{ width: "10px" }} s>
                        <Button
                          variant="danger"
                          size="sm"
                          disabled={item.stockLevel === 0}
                        >
                          Remove Stock
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
          {/* </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </div>
  );
};

export default InventoryManagement;
