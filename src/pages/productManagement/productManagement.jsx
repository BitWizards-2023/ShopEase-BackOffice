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
  FaCheck,
  FaTimes,
  FaEllipsisV,
} from "react-icons/fa";
import AddProduct from "./components/AddProduct"; // Separate Add Product component
import EditProduct from "./components/EditProduct"; // Separate Edit Product component
import ProductDetails from "./components/detailProduct"; // Separate Product Details component

export default function ProductManagement() {
  // Mock data for products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 1000,
      image: "https://via.placeholder.com/100",
      description: "High-performance laptop for professionals.",
      status: true,
    },
    {
      id: 2,
      name: "Smartphone",
      category: "Electronics",
      price: 500,
      image: "https://via.placeholder.com/100",
      description: "Latest smartphone with advanced features.",
      status: false,
    },
    {
      id: 3,
      name: "Tablet",
      category: "Electronics",
      price: 300,
      image: "https://via.placeholder.com/100",
      description: "Lightweight tablet for entertainment on the go.",
      status: true,
    },
    {
      id: 4,
      name: "Headphones",
      category: "Accessories",
      price: 150,
      image: "https://via.placeholder.com/100",
      description: "Noise-cancelling headphones for immersive sound.",
      status: true,
    },
    {
      id: 5,
      name: "Smartwatch",
      category: "Accessories",
      price: 200,
      image: "https://via.placeholder.com/100",
      description: "Smartwatch with fitness tracking and notifications.",
      status: false,
    },
  ]);

  // State for handling modals and product details
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
  const [editProduct, setEditProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null); // State to store product details
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Function to handle adding a new product
  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  // Function to handle opening the edit modal with the selected product
  const handleShowEditModal = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  // Function to handle showing the product details modal
  const handleShowDetailsModal = (product) => {
    setProductDetails(product);
    setShowDetailsModal(true);
  };

  // Function to save edited product
  const handleSaveEditProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setShowEditModal(false);
  };

  // Function to delete a product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Function to toggle product status (active/inactive)
  const handleToggleStatus = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, status: !product.status } : product
      )
    );
  };

  // Calculate important statistics
  const totalProducts = products.length;
  const activeProducts = products.filter((product) => product.status).length;
  const inactiveProducts = products.filter((product) => !product.status).length;
  const totalStockValue = products.reduce(
    (acc, product) => acc + product.price,
    0
  );

  // Filtered products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <h2 className="mb-4 d-flex align-items-center">
        <span>Product Management</span>

        {/* Add Product Button */}
        <div className="ms-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus className="me-2" />
            Add New Product
          </Button>
        </div>
      </h2>

      {/* Row of Cards for Important Information */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>
                <h3>{totalProducts}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Active Products</Card.Title>
              <Card.Text>
                <h3>{activeProducts}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Inactive Products</Card.Title>
              <Card.Text>
                <h3>{inactiveProducts}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Total Stock Value</Card.Title>
              <Card.Text>
                <h3>${totalStockValue.toLocaleString()}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Product Listings Heading with Search Bar */}
      <Row className="mb-4 d-flex align-items-center justify-content-between">
        <Col md={6}>
          <h4>Product Listings</h4>
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

      {/* Table for Product Listings */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>
                          {product.status ? (
                            <span className="text-success">
                              <FaCheck className="me-1" />
                              Active
                            </span>
                          ) : (
                            <span className="text-danger">
                              <FaTimes className="me-1" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td>
                          {/* Action Menu */}
                          <DropdownButton
                            variant="link"
                            title={<FaEllipsisV />}
                            id={`dropdown-${product.id}`}
                            align="end"
                          >
                            <Dropdown.Item
                              onClick={() => handleShowEditModal(product)}
                            >
                              <FaEdit className="me-2" />
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <FaTrash className="me-2" />
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleToggleStatus(product.id)}
                            >
                              {product.status ? (
                                <>
                                  <FaTimes className="me-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <FaCheck className="me-2" />
                                  Activate
                                </>
                              )}
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleShowDetailsModal(product)}
                            >
                              View Details
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
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

      {/* Add Product Modal */}
      <AddProduct
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddProduct}
      />

      {/* Edit Product Modal */}
      <EditProduct
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        product={editProduct}
        onSave={handleSaveEditProduct}
      />

      {/* Product Details Modal */}
      <ProductDetails
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        product={productDetails}
      />
    </div>
  );
}
