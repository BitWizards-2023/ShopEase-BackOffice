// src/components/LoginForm.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Nav,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../../assets/login.jpg"; // Import the image from the assets
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { loginUser } from "../../features/auth/authSlice"; // Import the loginUser action

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access authentication state from Redux
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  // State to manage form input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((action) => {
      // Check if the login was successful
      if (action.meta.requestStatus === "fulfilled") {
        navigate("/dashboard"); // Navigate to the dashboard on successful login
      }
    });
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
          <div className="p-4" style={{ width: "100%", maxWidth: "550px" }}>
            <h2 className="mb-3 text-center">Welcome Back!</h2>
            <p className="text-center mb-4">
              Please log in to your account to continue accessing our services.
            </p>

            {/* Display error message if login failed */}
            {authStatus === "failed" && (
              <Alert variant="danger" className="text-center">
                {authError || "Failed to login. Please check your credentials."}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>
                  Email address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: "10px" }}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox" className="mt-3">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              <Form.Group controlId="formPrivacyPolicy" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="I accept the privacy policies"
                  required
                />
              </Form.Group>

              {/* Submit Button */}
              <Button
                variant="primary"
                type="submit"
                className="mt-4 w-100"
                disabled={authStatus === "loading"}
              >
                {authStatus === "loading" ? "Logging in..." : "Submit"}
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
