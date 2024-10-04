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
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheck,
  FaTimes,
  FaEllipsisV,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  activateProduct,
  deactivateProduct,
} from "../../features/products/productSlice";
import { fetchCategories, fetchCategoryById } from "../../features/category/categorySlice"; // Import category actions
import AddProduct from "./components/addProduct";
import EditProduct from "./components/editProduct";
import ProductDetails from "./components/detailProduct";

export default function ProductManagement() {
  const dispatch = useDispatch();

  // Fetch products and categories from Redux store
  const { products = [], status: productStatus } = useSelector((state) => state.products);  // Initialize products as empty array
  const { categories = [], status: categoryStatus } = useSelector((state) => state.category); // Fetch categories

  // State for handling modals and product details
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
  const [editProduct, setEditProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null); // State to store product details
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts()); // Fetch products from backend on mount
    }
    if (categoryStatus === "idle") {
      dispatch(fetchCategories()); // Fetch categories on mount
    }
  }, [dispatch, productStatus, categoryStatus]);

  // Function to handle adding a new product
  const handleAddProduct = async (newProduct) => {
    await dispatch(addProduct(newProduct));
    setShowAddModal(false);
  };

  // Function to handle editing a product
  const handleSaveEditProduct = async (updatedProduct) => {
    await dispatch(updateProduct({ id: updatedProduct.id, updatedProduct }));
    setShowEditModal(false);
  };

  // Function to handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      console.log("Deleting product with ID:", id);
      await dispatch(deleteProduct(id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  // Function to toggle product status (activate/deactivate)
  const handleToggleStatus = async (id, isActive) => {
    try {
      console.log("Toggling status for product with ID:", id, "isActive:", isActive);
      if (isActive) {
        await dispatch(deactivateProduct(id)); // Deactivate if currently active
      } else {
        await dispatch(activateProduct(id)); // Activate if currently inactive
      }
    } catch (error) {
      console.error("Error toggling product status:", error);
    }
  };


  // Safeguard: Ensure categories is an array and category name exists before using .toLowerCase()
  const filteredProducts = Array.isArray(products) && products.length > 0
    ? products.filter((product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  // Function to get the category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  // Calculate important statistics
  const totalProducts = Array.isArray(products) ? products.length : 0;
  const activeProducts = Array.isArray(products)
    ? products.filter((product) => product.isActive).length
    : 0;
  const inactiveProducts = Array.isArray(products)
    ? products.filter((product) => !product.isActive).length
    : 0;
  const totalStockValue = Array.isArray(products)
    ? products.reduce((acc, product) => acc + product.price, 0)
    : 0;

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
                        {/* Map categoryId to category name */}
                        <td>
                          {product.categoryIds.map((categoryId) => (
                            <span key={categoryId}>
                              {getCategoryName(categoryId)}
                            </span>
                          ))}
                        </td>
                        <td>${product.price}</td>
                        <td>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>
                          {product.isActive ? (
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
                              onClick={() => {
                                setEditProduct(product);  // Set the selected product to edit
                                setShowEditModal(true);   // Show the edit modal
                              }}
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
                              onClick={() =>
                                handleToggleStatus(product.id, product.isActive)
                              }
                            >
                              {product.isActive ? (
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
                              onClick={() => {
                                setProductDetails(product);  // Set the selected product to display
                                setShowDetailsModal(true);   // Show the details modal
                              }}
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
        categories={categories} // Pass categories here
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
