// import React from "react";
// import { Modal, Button, ListGroup } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";

// const VendorDetails = ({ show, onHide, vendor }) => {
//   return (
//     <Modal show={show} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>Vendor Details - {vendor.name}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h5>
//           Average Ranking: {vendor.averageRanking}{" "}
//           <FaStar className="text-warning" />
//         </h5>
//         <h6>Customer Comments:</h6>
//         <ListGroup>
//           {vendor.customerComments.map((comment) => (
//             <ListGroup.Item key={comment.id}>
//               <strong>{comment.user}:</strong> {comment.comment}{" "}
//               <FaStar className="text-warning" /> {comment.ranking}
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default VendorDetails;

import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const VendorDetails = ({ show, onHide }) => {
  // Hardcoded vendor details
  const vendor = {
    name: "Tech Supplies",
    averageRanking: 4.2,
    address: "5678 Oak Street",
    street: "Oak Street",
    state: "New York",
    postalCode: "10001",
    country: "USA",
    phoneNumber: "+1 987-654-3210",
    customerComments: [
      { id: 1, user: "Alice", comment: "Great service!", ranking: 5 },
      { id: 2, user: "Bob", comment: "Average experience.", ranking: 3 },
      { id: 3, user: "Charlie", comment: "Will buy again!", ranking: 4 },
    ],
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Vendor Details - {vendor.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">
          Average Ranking: {vendor.averageRanking}{" "}
          <FaStar className="text-warning" />
        </h5>
        <h6 className="mb-3">Contact Information:</h6>
        <div className="mb-4">
          <p className="mb-1">
            <strong>Name:</strong> {vendor.name}
          </p>
          <p className="mb-1">
            <strong>Address:</strong> {vendor.address}, {vendor.street},{" "}
            {vendor.state}, {vendor.postalCode}, {vendor.country}
          </p>
          <p>
            <strong>Phone Number:</strong> {vendor.phoneNumber}
          </p>
        </div>
        <h6 className="mb-3">Customer Comments:</h6>
        <ListGroup>
          {vendor.customerComments.map((comment) => (
            <ListGroup.Item
              key={comment.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{comment.user}:</strong> {comment.comment}
              </div>
              <div>
                <FaStar className="text-warning" /> {comment.ranking}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VendorDetails;
