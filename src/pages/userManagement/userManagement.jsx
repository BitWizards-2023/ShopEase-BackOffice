import React, { useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  Form,
  Badge,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaPlus, FaBell, FaEdit, FaTrash, FaUsers, FaUserShield } from "react-icons/fa";
import AddUser from "./components/addUser";
import EditUser from "./components/editUser";
import Notifications from "./components/notifications";

export default function UserManagement() {
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

  const [notifications, setNotifications] = useState([
    { id: 1, message: "User John Doe has been promoted to Administrator." },
    { id: 2, message: "Vendor Jane Smith has added a new product." },
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const handleEditUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setShowEditUserModal(false);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setShowDeleteModal(false);
  };

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === "Administrator").length;
  const totalVendors = users.filter((user) => user.role === "Vendor").length;
  const totalCSRs = users.filter((user) => user.role === "CSR").length;

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
          <Card className="text-center glass-card shadow-lg" style={{ transition: "0.3s", cursor: "pointer" }}>
            <Card.Body>
              <FaUsers size={30} className="mb-2" />
              <Card.Title>Total Users</Card.Title>
              <Badge pill bg="primary">
                <h3>{totalUsers}</h3>
              </Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card shadow-lg" style={{ transition: "0.3s", cursor: "pointer" }}>
            <Card.Body>
              <FaUserShield size={30} className="mb-2" />
              <Card.Title>Administrators</Card.Title>
              <Badge pill bg="info">
                <h3>{totalAdmins}</h3>
              </Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card shadow-lg" style={{ transition: "0.3s", cursor: "pointer" }}>
            <Card.Body>
              <FaBell size={30} className="mb-2" />
              <Card.Title>Vendors</Card.Title>
              <Badge pill bg="secondary">
                <h3>{totalVendors}</h3>
              </Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card shadow-lg" style={{ transition: "0.3s", cursor: "pointer" }}>
            <Card.Body>
              <FaBell size={30} className="mb-2" />
              <Card.Title>CSRs</Card.Title>
              <Badge pill bg="danger">
                <h3>{totalCSRs}</h3>
              </Badge>
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
          <Card className="mb-4 shadow-sm">
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
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <Badge
                            bg={
                              user.role === "Administrator"
                                ? "info"
                                : user.role === "Vendor"
                                ? "secondary"
                                : "danger"
                            }
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td>
                          {/* Action Buttons */}
                          <div className="d-flex justify-content-around">
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip id={`edit-tooltip-${user.id}`}>Edit User</Tooltip>}
                            >
                              <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => {
                                  setEditUser(user);
                                  setShowEditUserModal(true);
                                }}
                              >
                                <FaEdit />
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip id={`delete-tooltip-${user.id}`}>Delete User</Tooltip>}
                            >
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => {
                                  setUserToDelete(user);
                                  setShowDeleteModal(true);
                                }}
                              >
                                <FaTrash />
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
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

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete user <b>{userToDelete.name}</b>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteUser}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
