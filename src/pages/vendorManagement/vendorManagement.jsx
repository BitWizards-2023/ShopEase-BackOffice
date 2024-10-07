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
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaEllipsisV, FaStar, FaComments } from "react-icons/fa";
import AddVendor from "./components/addVendor";
import VendorDetails from "./components/vendorDetails";
import Notifications from "./components/notifications";

export default function VendorManagement() {
  // Mock data for vendors
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Tech Supplies",
      averageRanking: 4.2,
      customerComments: [
        { id: 1, user: "John Doe", comment: "Great service!", ranking: 5 },
        {
          id: 2,
          user: "Jane Smith",
          comment: "Good, but delayed shipping.",
          ranking: 3,
        },
      ],
    },
    {
      id: 2,
      name: "Smart Gadgets",
      averageRanking: 3.8,
      customerComments: [
        { id: 1, user: "Alex Johnson", comment: "Good products!", ranking: 4 },
      ],
    },
  ]);

  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add a new vendor
  const handleAddVendor = (newVendor) => {
    setVendors([...vendors, { ...newVendor, id: vendors.length + 1 }]);
  };

  // Filtered vendors based on search query
  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate important statistics
  const totalVendors = vendors.length;
  const averageRanking = (
    vendors.reduce((acc, vendor) => acc + vendor.averageRanking, 0) /
    vendors.length
  ).toFixed(1);

  return (
    <div className="vendor-management">
      {/* Header */}
      <h2 className="mb-4 d-flex align-items-center">
        <span className="me-2">Vendor Management</span>

        {/* Notifications Icon */}
        <Notifications notifications={[]} />

        {/* Add Vendor Button */}
        <div className="ms-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddVendorModal(true)}
            className="shadow-sm hover-scale"
            style={{
              background: "linear-gradient(135deg, #00c6ff, #0072ff)",
              border: "none",
              borderRadius: "12px",
              transition: "transform 0.3s",
            }}
          >
            <FaPlus className="me-2" />
            Add New Vendor
          </Button>
        </div>
      </h2>

      {/* Row of Cards for Important Information */}
      <Row className="mb-4">
        <Col md={6}>
          <Card
            className="text-center glass-card shadow-lg"
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "15px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <Card.Body>
              <Card.Title>Total Vendors</Card.Title>
              <Card.Text>
                <h3>{totalVendors}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card
            className="text-center glass-card shadow-lg"
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "15px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <Card.Body>
              <Card.Title>Average Vendor Ranking</Card.Title>
              <Card.Text>
                <h3>
                  {averageRanking}{" "}
                  <FaStar className="text-warning star-animated" />
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
            className="shadow-sm search-bar"
            style={{ borderRadius: "8px" }}
          />
        </Col>
      </Row>

      {/* Table for Vendor Listings */}
      <Row className="mb-4">
        <Col md={12}>
          <Card
            className="mb-4 shadow-lg"
            style={{ borderRadius: "15px", overflow: "hidden" }}
          >
            <Card.Body>
              <Card.Title>Vendors</Card.Title>
              <Table striped bordered hover responsive className="table-vendors">
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Average Ranking</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="align-middle">
                      <td>{vendor.name}</td>
                      <td>
                        {vendor.averageRanking}{" "}
                        <FaStar className="text-warning star-animated" />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {/* Icon with Comment Count */}
                          <Button
                            variant="light"
                            size="sm"
                            className="comment-bubble-button shadow-sm"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              borderRadius: "15px",
                              border: "1px solid #ccc",
                              padding: "4px 8px",
                              cursor: "pointer",
                              transition: "background-color 0.3s, box-shadow 0.3s",
                              position: "relative",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#f0f0f0";
                              e.currentTarget.style.boxShadow =
                                "0px 4px 8px rgba(0, 0, 0, 0.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "white";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            <FaComments
                              className="me-2"
                              style={{ color: "#007bff" }}
                            />
                            <span
                              style={{
                                fontWeight: "500",
                                color: "#007bff",
                              }}
                            >
                              {vendor.customerComments.length}
                            </span>
                            {/* Badge for Comments */}
                            <span
                              className="badge bg-primary rounded-pill"
                              style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                padding: "5px 10px",
                                fontSize: "12px",
                                color: "white",
                                backgroundColor: "#007bff",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              View
                            </span>
                          </Button>

                          {/* Tooltip for Detailed Comments */}
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip
                                id={`tooltip-${vendor.id}`}
                                className="comment-tooltip"
                              >
                                {vendor.customerComments.map((comment) => (
                                  <div
                                    key={comment.id}
                                    className="comment-bubble"
                                    style={{
                                      marginBottom: "8px",
                                      backgroundColor: "#f8f9fa",
                                      padding: "6px 12px",
                                      borderRadius: "8px",
                                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                      color: "#333", // Darker color for better visibility
                                    }}
                                  >
                                    <strong style={{ color: "#000" }}>{comment.user}:</strong>{" "}
                                    {comment.comment}{" "}
                                    <FaStar className="text-warning" />{" "}
                                    {comment.ranking}
                                  </div>
                                ))}
                              </Tooltip>
                            }
                          >
                            <span className="ms-2" style={{ cursor: "pointer" }}>
                              Details
                            </span>
                          </OverlayTrigger>
                        </div>
                      </td>
                      <td>
                        {/* Action Menu */}
                        <DropdownButton
                          variant="link"
                          title={<FaEllipsisV />}
                          id={`dropdown-${vendor.id}`}
                          align="end"
                          className="shadow-sm hover-scale"
                        >
                          <Dropdown.Item
                            onClick={() => setVendorDetails(vendor)}
                          >
                            <FaEdit className="me-2" />
                            View Details
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

      {/* Add Vendor Modal */}
      <AddVendor
        show={showAddVendorModal}
        onHide={() => setShowAddVendorModal(false)}
        onSave={handleAddVendor}
      />

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
