import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors, approveRating } from "../../features/vendors/vendorSlice";
import Notifications from "./components/notifications"; // Separate Notifications component

export default function VendorManagement() {
  const [vendorDetails, setVendorDetails] = useState(null); // State to show vendor details in popup
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [commentsStatus, setCommentsStatus] = useState([]); // Status for each comment

  const dispatch = useDispatch();

  // Fetch vendors from Redux store
  const vendors = useSelector((state) => state.vendors?.vendors || []);
  const vendorStatus = useSelector((state) => state.vendors?.status || "idle");
  const error = useSelector((state) => state.vendors?.error || null);

  // Fetch vendors when the component mounts
  useEffect(() => {
    if (vendorStatus === "idle") {
      dispatch(fetchVendors()); // Dispatch the fetchVendors action
    }
  }, [vendorStatus, dispatch]);

  // Function to initialize the comment status when viewing vendor details
  const initializeCommentStatus = (vendor) => {
    setCommentsStatus(
      vendor.ratings.map((rating) => ({
        ...rating,
        status: rating.isApproved ? "Active" : "Inactive",
      }))
    );
  };

  // Function to handle "View More" click and show popup
  const handleViewMore = (vendor) => {
    setVendorDetails(vendor); // Set the selected vendor details
    initializeCommentStatus(vendor); // Initialize status for comments
    setShowPopup(true); // Show the popup
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setVendorDetails(null);
  };

  
  // Save comment status changes (simulated for now)
  const handleSaveComment = (ratingId) => {
    // Dispatch the approveRating action with the rating ID
    dispatch(approveRating(ratingId))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          console.log("Rating approved successfully");
        } else {
          console.error("Failed to approve rating");
        }
      })
      .catch((error) => {
        console.error("Error during rating approval:", error);
      });
  };
  // Ensure vendors is an array before filtering
  const filteredVendors = Array.isArray(vendors)
    ? vendors.filter((vendor) =>
        vendor.userName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Calculate total vendors and average ranking
  const totalVendors = filteredVendors.length;
  const averageRanking =
    filteredVendors.length > 0
      ? (
          filteredVendors.reduce(
            (acc, vendor) => acc + vendor.averageRating,
            0
          ) / filteredVendors.length
        ).toFixed(1)
      : 0;

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
              <th>Actions</th> {/* New Actions Column */}
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
                <td>{vendor.ratings?.length || 0} Comments</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleViewMore(vendor)}
                  >
                    View/Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Popup for viewing more details */}
      {vendorDetails && (
        <Modal show={showPopup} onHide={handleClosePopup} centered>
          <Modal.Header closeButton>
            <Modal.Title>Vendor Details - {vendorDetails.userName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Full Name</h5>
            <p>
              {vendorDetails.firstName} {vendorDetails.lastName}
            </p>
            <h5>Mobile Number</h5>
            <p>{vendorDetails.phoneNumber}</p>
            <h5>Average Rating</h5>
            <p>
              {vendorDetails.averageRating || "N/A"}{" "}
              <FaStar className="text-warning" />
            </p>

            {/* Enhanced Comments Section */}
            <h5>Comments</h5>
            <ListGroup>
              {commentsStatus.length > 0 ? (
                commentsStatus.map((rating) => (
                  <ListGroup.Item key={rating.customerId} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>Customer:</strong> {rating.customerId}
                      </div>
                      <div>
                        <FaStar className="text-warning" /> {rating.rating}
                      </div>
                    </div>
                    <div className="mt-2">
                      <strong>Comment:</strong> {rating.comment}
                    </div>
                  
                    <small className="text-muted">
                      Posted on {new Date(rating.createdAt).toLocaleDateString()}
                    </small>

                    {/* Dropdown for Status Selection */}
                    <div className="d-flex justify-content-between mt-3">
                      

                      {/* Save Button */}
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleSaveComment(rating.id)}
                      >
                        Change Status
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <p>No comments available</p>
              )}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePopup}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </div>
  );
}
