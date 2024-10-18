import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  activateUser,
  approveUser,
  updateUser,
  registerUser,
} from "../../../features/users/userSlice";
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
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import AddUser from "./components/addUser";
import EditUser from "./components/editUser";
import Notifications from "./components/notifications";
import UserDetailModal from "./components/detailUser";

export default function AdminUserManagement() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showUserDetailModal, setShowUserDetailModal] = useState(false);
  const [detailUser, setDetailUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // Handle adding a new user
  const handleAddUser = async (newUser) => {
    await dispatch(registerUser(newUser));
    await dispatch(fetchUsers()); // Fetch users again after adding a new user
    setShowAddUserModal(false); // Close modal after adding the user
  };

  // Handle saving the edited user
  const handleSaveEditUser = async (updatedUser) => {
    try {
      await dispatch(updateUser({ id: updatedUser.id, userData: updatedUser }));
      await dispatch(fetchUsers()); // Refetch users after updating
      setShowEditUserModal(false); // Close the modal
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user handler
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  // Activate user handler
  const handleActivateUser = (id) => {
    dispatch(activateUser(id));
  };

  // Approve user handler
  const handleApproveUser = (id) => {
    dispatch(approveUser(id));
  };

  // Calculate statistics
  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === "Admin").length;
  const totalVendors = users.filter((user) => user.role === "Vendor").length;
  const totalCSRs = users.filter((user) => user.role === "CSR").length;

  // Search logic
  const filteredUsers = users.filter(
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

  return (
    <div>
      {/* Header */}
      <h2 className="mb-4 d-flex align-items-center">
        <span className="me-2">User Management</span>

        {/* Notifications Icon */}
        <Notifications notifications={[]} />

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
                          <Dropdown.Item>
                            <FaEye className="me-2" />
                            View More
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <FaTrash className="me-2" />
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

      {/* Modals for Add, Edit, and Detail */}
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
    </div>
  );
}
