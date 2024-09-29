import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility icons
import signupImage from "../../assets/signup.jpg";

const SignupForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "vendor", // default to vendor
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle signup (you'll call your API here)
    console.log("Signup data:", formData);

    // Redirect to dashboard after successful signup
    navigate("/dashboard");
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
    >
      <Row className="w-100 h-100">
        {/* Left side with image taking 2/5 of screen, adding left padding */}
        <Col xs={12} md={5} className="d-none d-md-block p-0">
          <div
            style={{
              backgroundImage: `url(${signupImage})`, // Use image from assets
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              marginLeft: "130px",
            }}
          />
        </Col>

        {/* Right side with signup form taking 3/5 of screen */}
        <Col
          xs={12}
          md={7}
          className="d-flex align-items-center justify-content-center"
        >
          {/* Increase width of the form and add padding */}
          <div
            className="p-4"
            style={{
              width: "100%",
              maxWidth: "550px", // Increased width of the form
            }}
          >
            {/* Heading and Description */}
            <h2 className="mb-3 text-center">Create Your Account</h2>
            <p className="text-center mb-4">
              Join us today! Fill in the details below to create your account
              and get started.
            </p>

            <Form onSubmit={handleSubmit}>
              {/* First Name and Last Name in One Row */}
              <Row>
                <Col>
                  <Form.Group controlId="formFirstName" className="mt-3">
                    <Form.Label>
                      First Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      style={{ padding: "10px" }} // Increased padding for form fields
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formLastName" className="mt-3">
                    <Form.Label>
                      Last Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      style={{ padding: "10px" }} // Increased padding for form fields
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Phone Number */}
              <Form.Group controlId="formPhoneNumber" className="mt-3">
                <Form.Label>
                  Phone Number <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  style={{ padding: "10px" }} // Increased padding for form fields
                />
              </Form.Group>

              {/* Email */}
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>
                  Email address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ padding: "10px" }} // Increased padding for form fields
                />
              </Form.Group>

              {/* Password and Confirm Password in One Row */}
              <Row>
                <Col>
                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>
                      Password <span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ padding: "10px" }} // Increased padding for form fields
                      />
                      <InputGroup.Text
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formConfirmPassword" className="mt-3">
                    <Form.Label>
                      Confirm Password <span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ padding: "10px" }} // Increased padding for form fields
                      />
                      <InputGroup.Text
                        onClick={toggleConfirmPasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              {/* Role Selection */}
              <Form.Group controlId="formRoleSelect" className="mt-3">
                <Form.Label>
                  Select Role <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  style={{ padding: "10px" }} // Increased padding for form fields
                >
                  <option value="admin">Administrator</option>
                  <option value="vendor">Vendor</option>
                  <option value="csr">
                    Customer Service Representative (CSR)
                  </option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4 w-100">
                Sign Up
              </Button>

              <p className="mt-3 text-center">
                Already have an account?{" "}
                <Button variant="link" onClick={() => navigate("/")}>
                  Login here
                </Button>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
