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
import { FaPlus, FaBell, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import AddUser from "./components/addUser"; // Separate Add User component
import EditUser from "./components/editUser"; // Separate Edit User component
import Notifications from "./components/notifications"; // Separate Notifications component
import UserDetailModal from "./components/detailUser"; // User Detail Component

export default function UserManagement() {
  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "john_doe",
      firstName: "John",
      lastName: "Doe",
      role: "Administrator",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      profile_pic: "https://example.com/john_profile_pic.jpg",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
      },
    },
    {
      id: 2,
      username: "jane_smith",
      firstName: "Jane",
      lastName: "Smith",
      role: "Vendor",
      email: "jane@example.com",
      phoneNumber: "234-567-8901",
      profile_pic: "https://example.com/jane_profile_pic.jpg",
      address: {
        street: "456 Market St",
        city: "San Francisco",
        state: "CA",
        postalCode: "94105",
        country: "USA",
      },
    },
    {
      id: 3,
      username: "alex_johnson",
      firstName: "Alex",
      lastName: "Johnson",
      role: "CSR",
      email: "alex@example.com",
      phoneNumber: "345-678-9012",
      profile_pic: "https://example.com/alex_profile_pic.jpg",
      address: {
        street: "789 Broadway",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90001",
        country: "USA",
      },
    },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "User John Doe has been promoted to Administrator." },
    { id: 2, message: "Vendor Jane Smith has added a new product." },
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showUserDetailModal, setShowUserDetailModal] = useState(false); // State for UserDetailModal
  const [detailUser, setDetailUser] = useState(null); // State for the selected user for detail view
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Add a new user
  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNotifications([
      ...notifications,
      {
        id: notifications.length + 1,
        message: `User ${newUser.firstName} ${newUser.lastName} has been added.`,
      },
    ]);
  };

  // Edit an existing user
  const handleEditUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setShowEditUserModal(false);
  };

  // View User Details
  const handleViewUserDetails = (user) => {
    setDetailUser(user);
    setShowUserDetailModal(true);
  };

  // Calculate statistics for cards
  const totalUsers = users.length;
  const totalAdmins = users.filter(
    (user) => user.role === "Administrator"
  ).length;
  const totalVendors = users.filter((user) => user.role === "Vendor").length;
  const totalCSRs = users.filter((user) => user.role === "CSR").length;

  // Filtered users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(searchQuery)
  );

  return (
    <div>
      {/* Header */}
      <h2 className="mb-4 d-flex align-items-center">
        <span className="me-2">User Management</span>

        {/* Notifications Icon */}
        <Notifications notifications={notifications} />

        {/* Add User Button */}
        <div className="ms-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddUserModal(true)}
          >
            <FaPlus className="me-2" />
            Add New User
          </Button>
        </div>
      </h2>

      {/* Row of Cards for Important Information */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>
                <h3>{totalUsers}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Administrators</Card.Title>
              <Card.Text>
                <h3>{totalAdmins}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Vendors</Card.Title>
              <Card.Text>
                <h3>{totalVendors}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>CSRs</Card.Title>
              <Card.Text>
                <h3>{totalCSRs}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Listings Heading with Search Bar */}
      <Row className="mb-4 d-flex align-items-center justify-content-between">
        <Col md={6}>
          <h4>User Listings</h4>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table for User Listings */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Profile Picture</th>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <img
                          src={user.profile_pic}
                          alt={user.firstName}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </td>
                      <td>{user.username}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.role}</td>
                      <td>
                        {/* Action Menu */}
                        <DropdownButton
                          variant="link"
                          title="Actions"
                          id={`dropdown-${user.id}`}
                          align="end"
                        >
                          <Dropdown.Item
                            onClick={() => {
                              setEditUser(user);
                              setShowEditUserModal(true);
                            }}
                          >
                            <FaEdit className="me-2" />
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleViewUserDetails(user)}
                          >
                            <FaEye className="me-2" />
                            View More
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <FaTrash className="me-2" />
                            Delete
                          </Dropdown.Item>
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

      {/* Add User Modal */}
      <AddUser
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
        onSave={handleAddUser}
      />

      {/* Edit User Modal */}
      {editUser && (
        <EditUser
          show={showEditUserModal}
          onHide={() => setShowEditUserModal(false)}
          user={editUser}
          onSave={handleEditUser}
        />
      )}

      {/* User Detail Modal */}
      {detailUser && (
        <UserDetailModal
          show={showUserDetailModal}
          onHide={() => setShowUserDetailModal(false)}
          user={detailUser}
        />
      )}
    </div>
  );
}
