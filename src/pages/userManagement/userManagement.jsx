import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  activateUser,
  approveUser,
  updateUser,
  registerUser,
} from "../../features/users/userSlice";
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Modal,
  Alert,
  Badge,
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import AddUser from "./components/addUser";
import EditUser from "./components/editUser";
import UserDetailModal from "./components/detailUser";

export default function UserManagement() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showUserDetailModal, setShowUserDetailModal] = useState(false);
  const [detailUser, setDetailUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // Handle adding a new user
  const handleAddUser = async (newUser) => {
    await dispatch(registerUser(newUser));
    await dispatch(fetchUsers());
    setShowAddUserModal(false);
    addNotification("success", `User ${newUser.firstName} added successfully.`);
  };

  // Handle saving the edited user
  const handleSaveEditUser = async (updatedUser) => {
    try {
      await dispatch(updateUser({ id: updatedUser.id, userData: updatedUser }));
      await dispatch(fetchUsers());
      setShowEditUserModal(false);
      addNotification("success", `User ${updatedUser.firstName} updated successfully.`);
    } catch (error) {
      console.error("Error updating user:", error);
      addNotification("danger", "Error updating user.");
    }
  };

  // Open delete confirmation modal
  const handleDeleteUser = (id) => {
    setDeleteUserId(id);
    setShowDeleteConfirm(true);
  };

  // Confirm delete user
  const confirmDeleteUser = () => {
    if (deleteUserId) {
      const userToDelete = users.find((user) => user.id === deleteUserId);
      dispatch(deleteUser(deleteUserId));
      setShowDeleteConfirm(false);
      addNotification("danger", `User ${userToDelete.firstName} deleted successfully.`);
    }
  };

  // Activate user handler
  const handleActivateUser = (id) => {
    dispatch(activateUser(id));
  };

  // Approve user handler
  const handleApproveUser = (id) => {
    dispatch(approveUser(id));
  };

  // Add notification
  const addNotification = (type, message) => {
    const newNotification = { id: Date.now(), type, message };
    setNotifications((prev) => [...prev, newNotification]);
  };

  // Remove notification
  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Calculate statistics
  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === "Admin").length;
  const totalVendors = users.filter((user) => user.role === "Vendor").length;
  const totalCSRs = users.filter((user) => user.role === "CSR").length;

  // Sort logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key]?.toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toLowerCase() || "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Search logic
  const filteredUsers = sortedUsers.filter(
    (user) =>
      (user.firstName?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (user.lastName?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (user.username?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  // Color-coded roles
  const roleColor = (role) => {
    switch (role) {
      case "Administrator":
        return "bg-primary text-white";
      case "Vendor":
        return "bg-warning text-dark";
      case "CSR":
        return "bg-success text-white";
      default:
        return "bg-light text-dark";
    }
  };

  return (
    <div className="user-management">
      {/* Header */}
      <h2 className="mb-4 d-flex align-items-center">
        <span className="me-2">User Management</span>

        {/* Notifications Section */}
        <div className="ms-auto">
          <Button variant="primary" onClick={() => setShowNotification(!showNotification)}>
            Notifications <Badge bg="light" text="dark">{notifications.length}</Badge>
          </Button>
        </div>
      </h2>

      {/* Notifications Area */}
      {showNotification && (
        <div className="notifications mt-3">
          {notifications.map((notif) => (
            <Alert key={notif.id} variant={notif.type} className="d-flex justify-content-between align-items-center">
              <span>{notif.message}</span>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => clearNotification(notif.id)}
              >
                Clear
              </Button>
            </Alert>
          ))}
        </div>
      )}

      {/* Row of Cards for Important Information */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center glass-card bg-info text-white">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>
                <h3>{totalUsers}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card bg-primary text-white">
            <Card.Body>
              <Card.Title>Administrators</Card.Title>
              <Card.Text>
                <h3>{totalAdmins}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card bg-warning text-dark">
            <Card.Body>
              <Card.Title>Vendors</Card.Title>
              <Card.Text>
                <h3>{totalVendors}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center glass-card bg-success text-white">
            <Card.Body>
              <Card.Title>CSRs</Card.Title>
              <Card.Text>
                <h3>{totalCSRs}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search Bar */}
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
            className="shadow-sm"
          />
        </Col>
      </Row>

      {/* Table for User Listings */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="mb-4 shadow-lg">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Table striped bordered hover responsive className="text-center">
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
                    <tr key={user.id} className={roleColor(user.role)}>
                      <td>
                        <img
                          src={user.profile_pic}
                          alt={user.firstName}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            objectFit: "cover",
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
                        <DropdownButton
                          variant="link"
                          title="Actions"
                          id={`dropdown-${user.id}`}
                          align="end"
                          className="shadow-none"
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
                            <FaEye className="me-2" />
                            View More
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <FaTrash className="me-2 text-danger" />
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleActivateUser(user.id)}
                          >
                            Activate
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleApproveUser(user.id)}
                          >
                            Approve
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

      {/* Add, Edit, and Detail Modals */}
      <AddUser
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
        onSave={handleAddUser} // Bind the handleAddUser function
      />
      {editUser && (
        <EditUser
          show={showEditUserModal}
          onHide={() => setShowEditUserModal(false)}
          user={editUser}
          onSave={handleSaveEditUser} // Bind handleSaveEditUser to save changes
        />
      )}
      {detailUser && (
        <UserDetailModal
          show={showUserDetailModal}
          onHide={() => setShowUserDetailModal(false)}
          user={detailUser}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
