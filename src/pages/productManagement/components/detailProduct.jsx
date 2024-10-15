import React from "react";
import { Modal, Button, Row, Col, Table } from "react-bootstrap";

const ProductDetails = ({ show, onHide, product }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.name} - Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-4">
          {/* Left Column - Product Image */}
          <Col md={6}>
            <img
              src={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : ""
              }
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
            />
          </Col>

          {/* Right Column - Product Basic Information */}
          <Col md={6}>
            <h5>Product Name:</h5>
            <p>{product.name}</p>

            <h5>Product Code:</h5>
            <p>{product.productCode}</p>

            <h5>Category:</h5>
            <p>
              {product.categoryIds && product.categoryIds.length > 0
                ? product.categoryIds.join(", ") // Adjust this to show actual category names
                : "No Categories"}
            </p>

            <h5>Price:</h5>
            <p>${product.price}</p>

            <h5>Status:</h5>
            <p>{product.isActive ? "Active" : "Inactive"}</p>
          </Col>
        </Row>

        {/* Product Description */}
        <Row className="mb-4">
          <Col>
            <h5>Description:</h5>
            <p>{product.description}</p>
          </Col>
        </Row>

        {/* Stock Information */}
        <Row className="mb-4">
          <Col md={6}>
            <h5>Stock Level:</h5>
            <p>{product.stockLevel}</p>
          </Col>
          <Col md={6}>
            <h5>Low Stock Threshold:</h5>
            <p>{product.lowStockThreshold}</p>
          </Col>
        </Row>

        {/* Product Attributes */}
        <Row>
          <Col>
            <h5>Attributes:</h5>
            {product.attributes && product.attributes.length > 0 ? (
              <Table bordered>
                <thead>
                  <tr>
                    <th>Attribute Name</th>
                    <th>Attribute Value</th>
                  </tr>
                </thead>
                <tbody>
                  {product.attributes.map((attribute, index) => (
                    <tr key={index}>
                      <td>{attribute.name}</td>
                      <td>{attribute.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No attributes available.</p>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetails;
