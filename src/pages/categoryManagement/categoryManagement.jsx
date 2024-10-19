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
import { useSelector, useDispatch } from "react-redux";
import AddCategory from "./components/addCategory"; // Separate Add Category component
import EditCategory from "./components/editCategory"; // Separate Edit Category component
import CategoryDetails from "./components/detailCategory"; // Separate Category Details component
import {
  fetchCategories,
  deleteCategory,
} from "../../features/category/categorySlice"; // Redux actions

export default function CategoryManagement() {
  const dispatch = useDispatch();

  // Get categories from Redux store
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);
  const error = useSelector((state) => state.category.error);

  // State for handling modals and category details
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Fetch categories from backend when component loads
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Function to handle deleting a category
  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
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

  // Safeguard: Ensure categories is an array and category name exists before using .toLowerCase()
  const filteredCategories = Array.isArray(categories)
    ? categories.filter((category) =>
        category.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Calculate important statistics (with safeguard)
  const totalCategories = Array.isArray(categories) ? categories.length : 0;
  const activeCategories = Array.isArray(categories)
    ? categories.filter((category) => category.isActive).length
    : 0;
  const inactiveCategories = Array.isArray(categories)
    ? categories.filter((category) => !category.isActive).length
    : 0;

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
        <Col md>
          <Card
            className="text-center glass-card"
            style={{ backgroundColor: "#f0f8ff" }}
          >
            <Card.Body>
              <Card.Title>Total Categories</Card.Title>
              <Card.Text>
                <h3>{totalCategories}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card
            className="text-center glass-card"
            style={{ backgroundColor: "#e6ffe6" }}
          >
            <Card.Body>
              <Card.Title>Active Categories</Card.Title>
              <Card.Text>
                <h3>{activeCategories}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card
            className="text-center glass-card"
            style={{ backgroundColor: "#ffe6e6" }}
          >
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
          {/* <Card className="mb-4">
            <Card.Body> */}
          {error && <p className="text-danger">Error: {error}</p>}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      {category.imageUrl ? (
                        <a
                          href={category.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Image
                        </a>
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      {category.isActive ? (
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
                        {/* <Dropdown.Item>
                              {category.isActive ? (
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
                            </Dropdown.Item> */}
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
          {/* </Card.Body>
          </Card> */}
        </Col>
      </Row>

      {/* Add Category Modal */}
      <AddCategory show={showAddModal} onHide={() => setShowAddModal(false)} />

      {/* Edit Category Modal */}
      <EditCategory
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        category={editCategory}
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
