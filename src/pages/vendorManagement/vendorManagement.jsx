import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../../features/vendors/vendorSlice";
import VendorDetails from "./components/vendorDetails";
import Notifications from "./components/notifications"; // Separate Notifications component

export default function VendorManagement() {
  const [vendorDetails, setVendorDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const dispatch = useDispatch();

  // Fetch vendors from Redux store
  const vendors = useSelector((state) => state.vendors?.vendors || []);
  const vendorStatus = useSelector((state) => state.vendors?.status || "idle");
  const error = useSelector((state) => state.vendors?.error || null);

  // Debug: Log initial state of vendors
  console.log("Vendors from Redux state:", vendors);
  console.log("Vendor fetch status:", vendorStatus);
  console.log("Error state:", error);

  // Fetch vendors when the component mounts
  useEffect(() => {
    if (vendorStatus === "idle") {
      console.log("Dispatching fetchVendors action..."); // Debug: Dispatch action
      dispatch(fetchVendors()); // Dispatch the fetchVendors action
    }
  }, [vendorStatus, dispatch]);

  // Ensure vendors is an array before filtering
  const filteredVendors = Array.isArray(vendors)
    ? vendors.filter((vendor) =>
      vendor.userName?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  // Debug: Log filtered vendors
  console.log("Filtered vendors:", filteredVendors);

  // Calculate total vendors and average ranking
  const totalVendors = filteredVendors.length;
  const averageRanking =
    filteredVendors.length > 0
      ? (
        filteredVendors.reduce((acc, vendor) => acc + vendor.averageRating, 0) /
        filteredVendors.length
      ).toFixed(1)
      : 0;

  // Debug: Log total vendors and average ranking
  console.log("Total vendors:", totalVendors);
  console.log("Average ranking:", averageRanking);

  return (
    <div>
      {/* Header */}
      <h2 className="mb-4 d-flex align-items-center">
        <span className="me-2">Vendors List</span>

        {/* Notifications Icon */}
        <Notifications notifications={[]} />
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
                <h3>{totalVendors}</h3>
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

      {/* Display loading, error, or table of vendors */}
      {vendorStatus === "loading" && <p>Loading vendors...</p>}
      {vendorStatus === "failed" && <p>Error: {error}</p>}
      {vendorStatus === "succeeded" && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Average Ranking</th>
              <th>Comments</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor.vendorId}>
                <td>{vendor.userName}</td>
                <td>{vendor.firstName}</td>
                <td>{vendor.lastName}</td>
                <td>{vendor.phoneNumber}</td>
                <td>
                  {vendor.averageRating || "N/A"}{" "}
                  <FaStar className="text-warning" />
                </td>
                <td>
                  {vendor.ratings?.length || 0} Comments
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id={`tooltip-${vendor.vendorId}`}>
                        {vendor.ratings && vendor.ratings.length > 0
                          ? vendor.ratings.map((rating) => (
                            <div key={rating.customerId}>
                              <strong>{rating.customerId}:</strong>{" "}
                              {rating.comment}{" "}
                              <FaStar className="text-warning" />{" "}
                              {rating.rating}
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
