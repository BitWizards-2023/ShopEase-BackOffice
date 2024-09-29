import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../../assets/login.jpg"; // Import the image from the assets

const LoginForm = () => {
  const navigate = useNavigate();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
    >
      <Row className="w-100 h-100">
        {/* Left side with image taking 2/5 of screen */}
        <Col xs={12} md={5} className="d-none d-md-block p-0">
          <div
            style={{
              backgroundImage: `url(${loginImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              marginLeft: "130px",
            }}
          />
        </Col>

        {/* Right side with form taking 3/5 of screen */}
        <Col
          xs={12}
          md={7}
          className="d-flex align-items-center justify-content-center"
        >
          {/* Increase width of the form and form fields */}
          <div className="p-4" style={{ width: "100%", maxWidth: "550px" }}>
            {/* Heading and Description */}
            <h2 className="mb-3 text-center">Welcome Back!</h2>
            <p className="text-center mb-4">
              Please log in to your account to continue accessing our services.
            </p>

            {/* Login Form */}
            <Form onSubmit={handleSubmit}>
              {/* Email Field */}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>
                  Email address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  style={{ padding: "10px" }} // Increased padding for form fields
                />
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    placeholder="Password"
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

              {/* Remember Me Checkbox */}
              <Form.Group controlId="formBasicCheckbox" className="mt-3">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              {/* Privacy Policy Checkbox */}
              <Form.Group controlId="formPrivacyPolicy" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="I accept the privacy policies"
                  required
                />
              </Form.Group>

              {/* Submit Button */}
              <Button variant="primary" type="submit" className="mt-4 w-100">
                Submit
              </Button>

              {/* Signup Link */}
              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <Nav.Link
                  as="span"
                  onClick={() => navigate("/signup")}
                  style={{ cursor: "pointer", display: "inline", padding: 0 }}
                >
                  Sign up here
                </Nav.Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
