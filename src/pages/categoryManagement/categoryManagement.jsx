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
import AddCategory from "./components/addCategory"; // Separate Add Category component
import EditCategory from "./components/editCategory"; // Separate Edit Category component
import CategoryDetails from "./components/detailCategory"; // Separate Category Details component

export default function CategoryManagement() {
  // Mock data for categories
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Devices and gadgets",
      status: true,
    },
    {
      id: 2,
      name: "Accessories",
      description: "Various accessories like headphones and cases",
      status: false,
    },
    {
      id: 3,
      name: "Home Appliances",
      description: "Appliances for home use",
      status: true,
    },
    {
      id: 4,
      name: "Books",
      description: "Various kinds of books and literature",
      status: true,
    },
  ]);

  // State for handling modals and category details
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Function to handle adding a new category
  const handleAddCategory = (newCategory) => {
    setCategories([
      ...categories,
      { ...newCategory, id: categories.length + 1 },
    ]);
  };

  // Function to handle opening the edit modal with the selected category
  const handleShowEditModal = (category) => {
    setEditCategory(category);
    setShowEditModal(true);
  };

  // Function to handle showing the category details modal
  const handleShowDetailsModal = (category) => {
    setCategoryDetails(category);
    setShowDetailsModal(true);
  };

  // Function to save edited category
  const handleSaveEditCategory = (updatedCategory) => {
    setCategories(
      categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    );
    setShowEditModal(false);
  };

  // Function to delete a category
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  // Function to toggle category status (active/inactive)
  const handleToggleStatus = (id) => {
    setCategories(
      categories.map((category) =>
        category.id === id
          ? { ...category, status: !category.status }
          : category
      )
    );
  };

  // Calculate important statistics
  const totalCategories = categories.length;
  const activeCategories = categories.filter(
    (category) => category.status
  ).length;
  const inactiveCategories = categories.filter(
    (category) => !category.status
  ).length;

  // Filtered categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <h2 className="mb-4 d-flex align-items-center">
        <span>Category Management</span>

        {/* Add Category Button */}
        <div className="ms-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus className="me-2" />
            Add New Category
          </Button>
        </div>
      </h2>

      {/* Row of Cards for Important Information */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Total Categories</Card.Title>
              <Card.Text>
                <h3>{totalCategories}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Active Categories</Card.Title>
              <Card.Text>
                <h3>{activeCategories}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Inactive Categories</Card.Title>
              <Card.Text>
                <h3>{inactiveCategories}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Category Listings Heading with Search Bar */}
      <Row className="mb-4 d-flex align-items-center justify-content-between">
        <Col md={6}>
          <h4>Category Listings</h4>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table for Category Listings */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Category ID</th>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                          {category.status ? (
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
                            id={`dropdown-${category.id}`}
                            align="end"
                          >
                            <Dropdown.Item
                              onClick={() => handleShowEditModal(category)}
                            >
                              <FaEdit className="me-2" />
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <FaTrash className="me-2" />
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleToggleStatus(category.id)}
                            >
                              {category.status ? (
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
                              onClick={() => handleShowDetailsModal(category)}
                            >
                              View Details
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Category Modal */}
      <AddCategory
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddCategory}
      />

      {/* Edit Category Modal */}
      <EditCategory
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        category={editCategory}
        onSave={handleSaveEditCategory}
      />

      {/* Category Details Modal */}
      <CategoryDetails
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        category={categoryDetails}
      />
    </div>
  );
}
