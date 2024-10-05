import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  uploadImage,
} from "../../../features/products/productSlice"; // Import actions
import { fetchCategories } from "../../../features/category/categorySlice"; // Fetch categories for dropdown

const AddProduct = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories); // Get categories from Redux
  const imageUrl = useSelector((state) => state.products.imageUrl); // Get uploaded image URL

  // State for product form fields
  const [newProduct, setNewProduct] = useState({
    productCode: "",
    name: "",
    description: "",
    price: 0,
    categoryIds: [],
    attributes: [{ name: "", value: "" }],
    stockLevel: 0,
    lowStockThreshold: 0,
    isFeatured: false,
    imageFile: null, // For image file upload
  });

  useEffect(() => {
    // Fetch categories when component loads
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle input change for product fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const { options } = e.target;
    const selectedCategories = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setNewProduct({ ...newProduct, categoryIds: selectedCategories });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, imageFile: e.target.files[0] });
  };

  // Handle attribute change
  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...newProduct.attributes];
    updatedAttributes[index] = { ...updatedAttributes[index], [field]: value };
    setNewProduct({ ...newProduct, attributes: updatedAttributes });
  };

  // Add more attribute fields
  const handleAddAttribute = () => {
    setNewProduct({
      ...newProduct,
      attributes: [...newProduct.attributes, { name: "", value: "" }],
    });
  };

  // Save the product after uploading the image
  const handleSave = () => {
    if (newProduct.imageFile) {
      // Upload the image first
      dispatch(uploadImage(newProduct.imageFile)).then(() => {
        // Wait for imageUrl to be available
        if (imageUrl) {
          // Once the image is uploaded, create the product with the image URL
          const productData = {
            ...newProduct,
            images: [imageUrl], // Use uploaded image URL
          };
          dispatch(addProduct(productData));
          onHide(); // Close modal after saving
        }
      });
    } else {
      // No image selected, just create the product
      dispatch(addProduct(newProduct));
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="productCode">
            <Form.Label>Product Code</Form.Label>
            <Form.Control
              type="text"
              name="productCode"
              value={newProduct.productCode}
              onChange={handleInputChange}
              placeholder="Enter product code"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" multiple onChange={handleCategoryChange}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="productStockLevel">
            <Form.Label>Stock Level</Form.Label>
            <Form.Control
              type="number"
              name="stockLevel"
              value={newProduct.stockLevel}
              onChange={handleInputChange}
              placeholder="Enter stock level"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productLowStockThreshold">
            <Form.Label>Low Stock Threshold</Form.Label>
            <Form.Control
              type="number"
              name="lowStockThreshold"
              value={newProduct.lowStockThreshold}
              onChange={handleInputChange}
              placeholder="Enter low stock threshold"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productIsFeatured">
            <Form.Check
              type="switch"
              label="Featured"
              checked={newProduct.isFeatured}
              onChange={(e) =>
                setNewProduct({ ...newProduct, isFeatured: e.target.checked })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productAttributes">
            <Form.Label>Attributes</Form.Label>
            {newProduct.attributes.map((attr, index) => (
              <Row key={index} className="mb-2">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Attribute Name"
                    value={attr.name}
                    onChange={(e) =>
                      handleAttributeChange(index, "name", e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Attribute Value"
                    value={attr.value}
                    onChange={(e) =>
                      handleAttributeChange(index, "value", e.target.value)
                    }
                  />
                </Col>
              </Row>
            ))}
            <Button variant="secondary" onClick={handleAddAttribute}>
              Add Attribute
            </Button>
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

export default AddProduct;
