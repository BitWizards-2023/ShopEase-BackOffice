/**
 * Author: Perera U.L.U.S.L
 * 
 * This file contains the VendorManagement component, which is responsible for managing a list of vendors. 
 * It includes features such as displaying vendor statistics, searching, sorting, and managing vendors.
 * The component renders vendor information using cards with features like customer comments and vendor ranking.
 * Users can add new vendors via a floating action button (FAB), which triggers a modal form. 
 * The component uses React Bootstrap for UI components like Cards, Tables, Dropdowns, Progress Bars, and Accordions.
 * It also allows sorting vendors by name, ranking, or number of comments, and includes pagination for vendor listings.
 * Vendor details and customer feedback are shown in an interactive accordion for a cleaner user experience.
 * The vendors' state is managed locally using the useState hook, while search queries and modal states are also tracked.
 */

import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
  Accordion,
  ProgressBar,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaEllipsisV,
  FaStar,
  FaSort,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import AddVendor from "./components/addVendor";
import VendorDetails from "./components/vendorDetails";
import Notifications from "./components/notifications";

export default function VendorManagement() {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Tech Supplies",
      averageRanking: 4.2,
      customerComments: [
        { id: 1, user: "John Doe", comment: "Great service!", ranking: 5 },
        { id: 2, user: "Jane Smith", comment: "Good, but delayed shipping.", ranking: 3 },
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
  const [sortBy, setSortBy] = useState("name");

  const handleAddVendor = (newVendor) => {
    setVendors([...vendors, { ...newVendor, id: vendors.length + 1 }]);
  };

  const filteredVendors = vendors
    .filter((vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "ranking") return b.averageRanking - a.averageRanking;
      return b.customerComments.length - a.customerComments.length;
    });

  const totalVendors = vendors.length;
  const averageRanking = (
    vendors.reduce((acc, vendor) => acc + vendor.averageRanking, 0) / vendors.length
  ).toFixed(1);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f7f9fc" }}>
      <h2 className="mb-4 d-flex align-items-center">
        <span className="me-2" style={{ fontWeight: "600", fontSize: "24px" }}>
          Vendor Management
        </span>
        <Notifications notifications={[]} />
        <div className="ms-auto">
          <Button
            className="fab"
            variant="primary"
            size="lg"
            onClick={() => setShowAddVendorModal(true)}
            style={{
              borderRadius: "50%",
              padding: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#007bff",
            }}
          >
            <FaPlus />
          </Button>
        </div>
      </h2>

      {/* Stats Row */}
      <Row className="mb-4">
        <Col md={6}>
          <Card
            className="text-center glass-card"
            style={{
              background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
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
            className="text-center glass-card"
            style={{
              background: "linear-gradient(135deg, #ff9a9e, #fecfef)",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
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

      {/* Search and Sorting */}
      <Row className="mb-4 d-flex align-items-center justify-content-between">
        <Col md={6}>
          <h4 style={{ fontWeight: "600", fontSize: "20px" }}>Vendor Listings</h4>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: "25px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <DropdownButton
              as={InputGroup.Append}
              title={`Sort By ${sortBy}`}
              variant="outline-secondary"
              id="sort-by-dropdown"
              style={{
                borderRadius: "25px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Dropdown.Item onClick={() => setSortBy("name")}>Name</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("ranking")}>Ranking</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("comments")}>Comments</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </Col>
      </Row>

      {/* Vendor Cards */}
      <Row>
        {filteredVendors.map((vendor) => (
          <Col md={6} key={vendor.id}>
            <Card
              className="mb-4"
              style={{
                borderRadius: "15px",
                padding: "10px",
                background: "white",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {vendor.name}
                  <DropdownButton
                    variant="link"
                    title={<FaEllipsisV />}
                    id={`dropdown-${vendor.id}`}
                    align="end"
                  >
                    <Dropdown.Item onClick={() => setVendorDetails(vendor)}>
                      <FaEdit className="me-2" />
                      View Details
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <FaTrash className="me-2" />
                      Delete Vendor
                    </Dropdown.Item>
                  </DropdownButton>
                </Card.Title>
                <Card.Text>
                  <strong>Average Ranking:</strong> {vendor.averageRanking}{" "}
                  <FaStar className="text-warning" />
                  <ProgressBar
                    variant="warning"
                    now={(vendor.averageRanking / 5) * 100}
                    className="mt-2"
                    style={{ height: "6px", borderRadius: "5px" }}
                  />
                </Card.Text>

                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      {vendor.customerComments.length} Comments
                    </Accordion.Header>
                    <Accordion.Body>
                      {vendor.customerComments.map((comment) => (
                        <div key={comment.id}>
                          <strong>{comment.user}:</strong> {comment.comment}{" "}
                          <FaStar className="text-warning" /> {comment.ranking}
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Row className="mt-4">
        <Col>
          <Pagination className="justify-content-center">
            <Pagination.Prev>
              <FaChevronLeft />
            </Pagination.Prev>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>2</Pagination.Item>
            <Pagination.Next>
              <FaChevronRight />
            </Pagination.Next>
          </Pagination>
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
