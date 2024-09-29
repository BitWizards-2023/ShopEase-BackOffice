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
import { FaEdit, FaTrash, FaPlus, FaEllipsisV, FaStar } from "react-icons/fa";
import AddVendor from "./components/addVendor"; // Separate Add Vendor component
import VendorDetails from "./components/vendorDetails"; // Separate Vendor Details component
import Notifications from "./components/notifications"; // Separate Notifications component

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
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

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
    <div>
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
          >
            <FaPlus className="me-2" />
            Add New Vendor
          </Button>
        </div>
      </h2>

      {/* Row of Cards for Important Information */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Total Vendors</Card.Title>
              <Card.Text>
                <h3>{totalVendors}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center glass-card">
            <Card.Body>
              <Card.Title>Average Vendor Ranking</Card.Title>
              <Card.Text>
                <h3>
                  {averageRanking} <FaStar className="text-warning" />
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
              <Table striped bordered hover responsive>
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
                    <tr key={vendor.id}>
                      <td>{vendor.name}</td>
                      <td>
                        {vendor.averageRanking}{" "}
                        <FaStar className="text-warning" />
                      </td>
                      <td>
                        {vendor.customerComments.length} Comments
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id={`tooltip-${vendor.id}`}>
                              {vendor.customerComments.map((comment) => (
                                <div key={comment.id}>
                                  <strong>{comment.user}:</strong>{" "}
                                  {comment.comment}{" "}
                                  <FaStar className="text-warning" />{" "}
                                  {comment.ranking}
                                </div>
                              ))}
                            </Tooltip>
                          }
                        >
                          <Button variant="link" className="p-0 ms-2">
                            View Comments
                          </Button>
                        </OverlayTrigger>
                      </td>
                      <td>
                        {/* Action Menu */}
                        <DropdownButton
                          variant="link"
                          title={<FaEllipsisV />}
                          id={`dropdown-${vendor.id}`}
                          align="end"
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
