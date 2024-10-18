// src/components/LoginForm.jsx

import React, { useState, useEffect } from "react";
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
import loginImage from "../../assets/login.jpg"; // Ensure the path is correct
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../features/auth/authSlice"; // Adjust the path as needed
import { updateFCMToken } from "../../features/users/userSlice"; // Import the updateFCMToken thunk
import {
  retrieveFCMToken,
  handleIncomingMessages,
  handleTokenRefresh,
} from "../../conf/firebase"; // Adjust the path based on your project structure

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access authentication state from Redux
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user); // Assuming you store user data

  console.log(user);

  // State to manage form input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // State for notifications
  const [notification, setNotification] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendFCMTokenToBackend = async (token) => {
    try {
      const userId = user.id;
      console.log(user);

      await dispatch(updateFCMToken(token)).unwrap();

      console.log("FCM Token sent to backend successfully.");
    } catch (error) {
      console.error("Error sending FCM token to backend:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch loginUser action
    try {
      const actionResult = await dispatch(
        signupUser({ email, password })
      ).unwrap();

      // After successful login, retrieve FCM token
      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY; // Replace with your actual VAPID key
      const fcmToken = await retrieveFCMToken(vapidKey);

      if (fcmToken) {
        await sendFCMTokenToBackend(fcmToken);
      }

      // Handle incoming messages while the app is in the foreground
      handleIncomingMessages((payload) => {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      });

      // Handle token refresh
      handleTokenRefresh(vapidKey, async (newToken) => {
        try {
          await sendFCMTokenToBackend(newToken);
        } catch (error) {
          console.error("Error updating refreshed FCM token:", error);
        }
      });

      // Redirect based on user role
      redirectToDashboard(actionResult.role);
    } catch (error) {
      console.error("Login failed:", error);
      // Error handling is managed by Redux state (authError)
    }
  };

  // Function to redirect user based on role
  const redirectToDashboard = (role) => {
    if (role === "Admin") {
      navigate("/admin");
    } else if (role === "Vendor") {
      navigate("/vendor");
    } else if (role === "CSR") {
      navigate("/csr");
    } else {
      navigate("/dashboard");
    }
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

            {/* Display notification */}
            {notification && (
              <Alert
                variant="info"
                onClose={() => setNotification(null)}
                dismissible
              >
                <Alert.Heading>{notification.title}</Alert.Heading>
                <p>{notification.body}</p>
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
