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
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaEllipsisV, FaStar } from "react-icons/fa";
import AddVendor from "./components/addVendor"; // Separate Add Vendor component
import VendorDetails from "./components/vendorDetails"; // Separate Vendor Details component
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/userSlice";
import Notifications from "./components/notifications"; // Separate Notifications component

export default function VendorManagement() {
  // Mock data for vendors
  // const [vendors, setVendors] = useState([
  //   {
  //     id: 1,
  //     name: "Tech Supplies",
  //     averageRanking: 4.2,
  //     customerComments: [
  //       { id: 1, user: "John Doe", comment: "Great service!", ranking: 5 },
  //       {
  //         id: 2,
  //         user: "Jane Smith",
  //         comment: "Good, but delayed shipping.",
  //         ranking: 3,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Smart Gadgets",
  //     averageRanking: 3.8,
  //     customerComments: [
  //       { id: 1, user: "Alex Johnson", comment: "Good products!", ranking: 4 },
  //     ],
  //   },
  // ]);

  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const dispatch = useDispatch();

  // Fetch users (vendors) from Redux store
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  // Fetch users (vendors) when component mounts
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  // Filter users to display only vendors
  const vendors = users.filter((user) => user.role === "Vendor");

  // Filter vendors based on search query
  const filteredVendors = vendors.filter((vendor) =>
    vendor.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate important statistics
  const totalVendors = vendors.length;
  const averageRanking = (
    vendors.reduce((acc, vendor) => acc + vendor.averageRanking, 0) /
    vendors.length
  ).toFixed(1);

  return (
    <div>
      {/* Header */}
      <h2 className="mb-4 d-flex align-items-center">
        <span className="me-2">Vendors List</span>

        {/* Notifications Icon */}
        <Notifications notifications={[]} />

        {/* Add Vendor Button */}
        {/* <div className="ms-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddVendorModal(true)}
          >
            <FaPlus className="me-2" />
            Add New Vendor
          </Button>
        </div> */}
      </h2>

      {/* Row of Cards for Important Information */}
      <Row className="mb-4">
        <Col md={6}>
          <Card
            className="text-center glass-card"
            style={{ backgroundColor: "#d1ecf1" }}
          >
            <Card.Body>
              <Card.Title>Total Vendors</Card.Title>
              <Card.Text>
                <h3>{vendors.length}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card
            className="text-center glass-card"
            style={{ backgroundColor: "#fef5e7" }}
          >
            <Card.Body>
              <Card.Title>Average Vendor Ranking</Card.Title>
              <Card.Text>
                <h3>
                  {vendors.length > 0
                    ? (
                        vendors.reduce(
                          (acc, vendor) => acc + vendor.averageRanking,
                          0
                        ) / vendors.length
                      ).toFixed(1)
                    : 0}{" "}
                  <FaStar className="text-warning" />
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Vendor Listings Heading with Search Bar */}
      <Row className="mb-4 d-flex align-items-center justify-content-between">
        <Col md={6}>
          <h4>Vendor Listings</h4>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table for Vendor Listings */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Vendors</Card.Title>

              {/* Display loading, error, or table of vendors */}
              {userStatus === "loading" && <p>Loading vendors...</p>}
              {userStatus === "failed" && <p>Error: {error}</p>}
              {userStatus === "succeeded" && (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mobile Number</th>
                      <th>Average Ranking</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendors.map((vendor) => (
                      <tr key={vendor.id}>
                        <td>{`${vendor.firstName} ${vendor.lastName}`}</td>{" "}
                        {/* Display First Name and Last Name */}
                        <td>{vendor.phoneNumber}</td>
                        <td>
                          {vendor.averageRanking || "N/A"}{" "}
                          <FaStar className="text-warning" />
                        </td>
                        <td>
                          {vendor.comments?.length || 0} Comments
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id={`tooltip-${vendor.id}`}>
                                {vendor.comments && vendor.comments.length > 0
                                  ? vendor.comments.map((comment) => (
                                      <div key={comment.id}>
                                        <strong>{comment.user}:</strong>{" "}
                                        {comment.comment}{" "}
                                        <FaStar className="text-warning" />{" "}
                                        {comment.ranking}
                                      </div>
                                    ))
                                  : "No comments available"}
                              </Tooltip>
                            }
                          >
                            <Button variant="link" className="p-0 ms-2">
                              View Comments
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Vendor Modal */}
      {/* <AddVendor
        show={showAddVendorModal}
        onHide={() => setShowAddVendorModal(false)}
        onSave={handleAddVendor}
      /> */}

      {/* Vendor Details Modal */}
      {vendorDetails && (
        <VendorDetails
          show={!!vendorDetails}
          onHide={() => setVendorDetails(null)}
          vendor={vendorDetails}
        />
      )}
    </div>
  );
}
