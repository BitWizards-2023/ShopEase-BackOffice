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
  Pagination,
  Badge,
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
  const [sortOption, setSortOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add a new vendor
  const handleAddVendor = (newVendor) => {
    setVendors([...vendors, { ...newVendor, id: vendors.length + 1 }]);
  };

  // Filter and sort vendors based on search query and selected sorting option
  const filteredVendors = vendors
    .filter((vendor) => vendor.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "ranking") {
        return b.averageRanking - a.averageRanking;
      } else if (sortOption === "comments") {
        return b.customerComments.length - a.customerComments.length;
      }
      return 0;
    });

  // Calculate important statistics
  const totalVendors = vendors.length;
  const averageRanking = (
    vendors.reduce((acc, vendor) => acc + vendor.averageRanking, 0) /
    vendors.length
  ).toFixed(1);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  // Function to change the page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Helper Function for Badge Color
  const getRankingBadgeColor = (ranking) => {
    if (ranking >= 4) return "#FF69B4"; // Pink for high rankings
    if (ranking >= 3) return "#00BFFF"; // Blue for medium rankings
    return "#FF6347"; // Default red color for lower rankings
  };

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
              background: "linear-gradient(135deg, #FF69B4, #00BFFF)",
              border: "none",
              borderRadius: "12px",
              transition: "transform 0.3s",
              padding: "10px 15px",
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
              padding: "20px",
            }}
          >
            <Card.Body>
              <Card.Title>Total Vendors</Card.Title>
              <Card.Text>
                <h3 className="text-info">{totalVendors}</h3>
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
              padding: "20px",
            }}
          >
            <Card.Body>
              <Card.Title>Average Vendor Ranking</Card.Title>
              <Card.Text>
                <h3>
                  <Badge
                    pill
                    style={{
                      backgroundColor: getRankingBadgeColor(averageRanking),
                      color: "#fff",
                    }}
                  >
                    {averageRanking}
                  </Badge>{" "}
                  <FaStar className="text-warning star-animated" />
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Vendor Listings Heading with Search Bar and Sort Option */}
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
        <Col md={2}>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="shadow-sm"
            style={{ borderRadius: "8px" }}
          >
            <option value="name">Sort by Name</option>
            <option value="ranking">Sort by Ranking</option>
            <option value="comments">Sort by Comments</option>
          </Form.Select>
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
                  {currentVendors.map((vendor) => (
                    <tr key={vendor.id} className="align-middle">
                      <td>{vendor.name}</td>
                      <td>
                        <Badge
                          pill
                          style={{
                            backgroundColor: getRankingBadgeColor(vendor.averageRanking),
                            color: "#fff",
                          }}
                        >
                          {vendor.averageRanking}
                        </Badge>{" "}
                        <FaStar
                          className="text-warning star-animated"
                          style={{ marginLeft: "5px" }}
                        />
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
                              backgroundColor: "#f8f9fa",
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
                          </Button>
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

              {/* Pagination */}
              <Pagination className="mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                      borderRadius: "8px",
                      margin: "0 3px",
                    }}
                    className="shadow-sm"
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
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
