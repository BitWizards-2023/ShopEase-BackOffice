import React, { useState } from "react";
import {
  Table,
  Card,
  Button,
  ProgressBar,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Notifications from "./components/notifications";
import CreateProduct from "./components/createProduct";
import "./InventoryManagement.css";

const InventoryManagement = () => {
  // Mock inventory data
  const [inventoryData, setInventoryData] = useState([
    {
      id: 1,
      name: "Laptop",
      stock: 5,
      lowStock: 10,
      price: 1000,
      pendingOrders: false,
    },
    {
      id: 2,
      name: "Smartphone",
      stock: 15,
      lowStock: 5,
      price: 500,
      pendingOrders: true,
    },
    {
      id: 3,
      name: "Tablet",
      stock: 0,
      lowStock: 5,
      price: 300,
      pendingOrders: false,
    },
    {
      id: 4,
      name: "Headphones",
      stock: 50,
      lowStock: 10,
      price: 150,
      pendingOrders: false,
    },
    {
      id: 5,
      name: "Smartwatch",
      stock: 3,
      lowStock: 5,
      price: 200,
      pendingOrders: true,
    },
  ]);

  // Search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Count of low stock notifications
  const lowStockItems = inventoryData.filter(
    (item) => item.stock <= item.lowStock && item.stock > 0
  );
  const outOfStockItems = inventoryData.filter((item) => item.stock === 0);
  const totalProducts = inventoryData.length;

  // Total stock value calculation
  const totalStockValue = inventoryData.reduce(
    (total, item) => total + item.stock * item.price,
    0
  );

  // Handler to add a new product
  const addProductHandler = (newProduct) => {
    const newProductData = {
      ...newProduct,
      id: inventoryData.length + 1, // Assign new ID
      stock: parseInt(newProduct.stock),
      lowStock: parseInt(newProduct.lowStock),
      price: parseFloat(newProduct.price),
      pendingOrders: false,
    };
    setInventoryData([...inventoryData, newProductData]); // Add the new product
  };

  // Filtered inventory based on search query
  const filteredInventory = inventoryData.filter((item) =>
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
          <CreateProduct onSave={addProductHandler} />
        </div>
      </h2>

      {/* Row of Cards for Additional Information */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="glass-card text-center">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>
                <h3>{totalProducts}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="glass-card text-center">
            <Card.Body>
              <Card.Title>Low Stock Products</Card.Title>
              <Card.Text>
                <h3>{lowStockItems.length}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="glass-card text-center">
            <Card.Body>
              <Card.Title>Out of Stock Products</Card.Title>
              <Card.Text>
                <h3>{outOfStockItems.length}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="glass-card text-center">
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
          <Card className="mb-4">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Stock Level</th>
                    <th>Low Stock Threshold</th>
                    <th>Pending Orders</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                          {item.stock}
                          <ProgressBar
                            now={(item.stock / item.lowStock) * 100}
                            variant={
                              item.stock <= item.lowStock ? "danger" : "success"
                            }
                            label={`${item.stock}`}
                            className="mt-2"
                          />
                        </td>
                        <td>{item.lowStock}</td>
                        <td>{item.pendingOrders ? "Yes" : "No"}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            disabled={item.pendingOrders || item.stock === 0}
                          >
                            Remove Stock
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InventoryManagement;
