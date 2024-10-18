import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  updateProduct,
  fetchProducts,
} from "../../../../features/products/productSlice";

const EditProduct = ({ show, onHide, product, onSave, categories }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  // Handle category selection (multi-select)
  const handleCategoryChange = (e) => {
    const selectedOptions = [...e.target.selectedOptions].map(
      (option) => option.value
    );
    setUpdatedProduct({ ...updatedProduct, categoryIds: selectedOptions });
  };

  const handleSave = async () => {
    const {
      id,
      productCode,
      name,
      description,
      categoryIds,
      price,
      stockLevel,
      lowStockThreshold,
      attributes,
      images,
      isActive,
    } = updatedProduct;

    try {
      // Dispatch the updateProduct action to update the product in the backend
      await dispatch(
        updateProduct({
          id,
          updatedProduct: {
            productCode,
            name,
            description,
            categoryIds,
            price,
            stockLevel,
            lowStockThreshold,
            attributes,
            images,
            isActive,
          },
        })
      );

      // After update, refetch the products
      await dispatch(fetchProducts());

      // Hide the modal after a successful save
      onHide();
    } catch (error) {
      console.error("Error updating the product: ", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Row for Product Name */}
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedProduct?.name || ""}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </Form.Group>

          {/* Row for Product Code and Category */}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="productCode">
                <Form.Label>Product Code</Form.Label>
                <Form.Control
                  type="text"
                  name="productCode"
                  value={updatedProduct?.productCode || ""}
                  onChange={handleInputChange}
                  placeholder="Enter product code"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="productCategory">
                <Form.Label>Categories</Form.Label>
                <Form.Control
                  as="select"
                  name="categoryIds"
                  multiple
                  value={updatedProduct?.categoryIds || []}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Row for Price and Stock Level */}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={updatedProduct?.price || ""}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="productStockLevel">
                <Form.Label>Stock Level</Form.Label>
                <Form.Control
                  type="number"
                  name="stockLevel"
                  value={updatedProduct?.stockLevel || ""}
                  onChange={handleInputChange}
                  placeholder="Enter stock level"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="productLowStockThreshold">
            <Form.Label>Low Stock Threshold</Form.Label>
            <Form.Control
              type="number"
              name="lowStockThreshold"
              value={updatedProduct?.lowStockThreshold || ""}
              onChange={handleInputChange}
              placeholder="Enter low stock threshold"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={updatedProduct?.description || ""}
              onChange={handleInputChange}
              placeholder="Enter product description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productAttributes">
            <Form.Label>Attributes (Name & Value)</Form.Label>
            <Form.Control
              type="text"
              name="attributes"
              value={updatedProduct?.attributes[0]?.name || ""}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  attributes: [
                    { ...updatedProduct.attributes[0], name: e.target.value },
                  ],
                })
              }
              placeholder="Enter attribute name"
            />
            <Form.Control
              type="text"
              name="attributesValue"
              value={updatedProduct?.attributes[0]?.value || ""}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  attributes: [
                    { ...updatedProduct.attributes[0], value: e.target.value },
                  ],
                })
              }
              placeholder="Enter attribute value"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="images"
              value={updatedProduct?.images[0] || ""}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  images: [e.target.value],
                })
              }
              placeholder="Enter image URL"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productStatus">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Active"
              checked={updatedProduct?.isActive || false}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  isActive: e.target.checked,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProduct;
