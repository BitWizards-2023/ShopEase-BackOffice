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
import { FaPlus, FaBell, FaEdit, FaTrash } from "react-icons/fa";
import AddUser from "./components/addUser"; // Separate Add User component
import EditUser from "./components/editUser"; // Separate Edit User component
import Notifications from "./components/notifications"; // Separate Notifications component

export default function UserManagement() {
  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Administrator",
      email: "john@example.com",
    },
    { id: 2, name: "Jane Smith", role: "Vendor", email: "jane@example.com" },
    { id: 3, name: "Alex Johnson", role: "CSR", email: "alex@example.com" },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "User John Doe has been promoted to Administrator." },
    { id: 2, message: "Vendor Jane Smith has added a new product." },
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Add a new user
  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNotifications([
      ...notifications,
      {
        id: notifications.length + 1,
        message: `User ${newUser.name} has been added.`,
      },
    ]);
  };

  // Edit an existing user
  const handleEditUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setShowEditUserModal(false);
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
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
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
    </div>
  );
}
