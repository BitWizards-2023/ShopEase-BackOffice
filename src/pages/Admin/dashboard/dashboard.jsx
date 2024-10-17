import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  ProgressBar,
  Dropdown,
  DropdownButton,
  Table,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./dashboard.css"; // Import custom styles

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // State for selected year in the filter
  const [selectedYear, setSelectedYear] = useState("2024");

  // Sales Growth Data for the graph
  const salesData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: `Monthly Sales in ${selectedYear} ($)`,
        data: [1000, 2000, 1500, 3000, 2500, 3500, 4000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  // Handle year change
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Dummy data for latest reviews
  const latestReviews = [
    { id: 1, product: "Laptop", review: "Excellent product!", rating: 5 },
    {
      id: 2,
      product: "Smartphone",
      review: "Good value for money.",
      rating: 4,
    },
    {
      id: 3,
      product: "Headphones",
      review: "Average sound quality.",
      rating: 3,
    },
    { id: 4, product: "Smartwatch", review: "Great battery life.", rating: 4 },
    { id: 5, product: "Tablet", review: "Not as expected.", rating: 2 },
  ];

  return (
    <div>
      {/* Header with Year Filter aligned horizontally */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2>Dashboard</h2>

        {/* Year Filter */}
        <DropdownButton
          id="dropdown-basic-button"
          title={`Year: ${selectedYear}`}
          onSelect={handleYearChange}
          variant="outline-primary"
        >
          <Dropdown.Item eventKey="2024">2024</Dropdown.Item>
          <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
          <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
        </DropdownButton>
      </div>

      {/* Row of Summary Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="glass-card" style={{ backgroundColor: "#f2f9ff" }}>
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text>
                <h3>$45,000</h3>
              </Card.Text>
              <ProgressBar now={75} label="75%" variant="info" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="glass-card" style={{ backgroundColor: "#fff7e6" }}>
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>
                <h3>1,230 Orders</h3>
              </Card.Text>
              <ProgressBar now={60} label="60%" variant="warning" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="glass-card" style={{ backgroundColor: "#e6fff5" }}>
            <Card.Body>
              <Card.Title>Total Customers</Card.Title>
              <Card.Text>
                <h3>850 Customers</h3>
              </Card.Text>
              <ProgressBar now={80} label="80%" variant="success" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sales Growth Graph (3/4 width) + Cards (1/4 width) */}
      <Row>
        {/* Sales Growth Graph taking 3/4 of the row */}
        <Col md={9}>
          <Card
            className="glass-card mb-4"
            style={{ backgroundColor: "#f2f9ff" }}
          >
            <Card.Body>
              <Card.Title>Sales Growth</Card.Title>
              <Line data={salesData} />
            </Card.Body>
          </Card>
        </Col>

        {/* Cards next to the graph, stacked vertically */}
        <Col md={3}>
          <Card
            className="glass-card mb-4"
            style={{ backgroundColor: "#fff5f2" }}
          >
            <Card.Body>
              <Card.Title>Low Stock Products</Card.Title>
              <Card.Text>10 products are running low in stock.</Card.Text>
              <ProgressBar variant="danger" now={30} label="30%" />
            </Card.Body>
          </Card>

          <Card
            className="glass-card mb-4"
            style={{ backgroundColor: "#fffde6" }}
          >
            <Card.Body>
              <Card.Title>Top Vendor</Card.Title>
              <Card.Text>Vendor ABC has achieved the highest sales.</Card.Text>
            </Card.Body>
          </Card>

          <Card className="glass-card" style={{ backgroundColor: "#e6fff5" }}>
            <Card.Body>
              <Card.Title>Order Fulfillment Rate</Card.Title>
              <Card.Text>
                <h3>95%</h3>
              </Card.Text>
              <ProgressBar now={95} label="95%" variant="success" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Cards for New Information */}
      <Row>
        <Col md={4}>
          <Card
            className="glass-card mb-4"
            style={{ backgroundColor: "#f5f9ff" }}
          >
            <Card.Body>
              <Card.Title>Customer Satisfaction</Card.Title>
              <Card.Text>
                <h3>92%</h3> of customers are satisfied with their orders.
              </Card.Text>
              <ProgressBar variant="success" now={92} label="92%" />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="glass-card mb-4"
            style={{ backgroundColor: "#fff7e6" }}
          >
            <Card.Body>
              <Card.Title>Refunded Orders</Card.Title>
              <Card.Text>
                <h3>8%</h3> of orders were refunded.
              </Card.Text>
              <ProgressBar variant="warning" now={8} label="8%" />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="glass-card mb-4"
            style={{ backgroundColor: "#f2fff5" }}
          >
            <Card.Body>
              <Card.Title>Products Shipped</Card.Title>
              <Card.Text>
                <h3>4,500</h3> products have been shipped.
              </Card.Text>
              <ProgressBar now={75} label="75%" variant="info" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Table of Latest Reviews */}
      <Row>
        <Col>
          <Card className="glass-card" style={{ backgroundColor: "#f9f9f9" }}>
            <Card.Body>
              <Card.Title>Latest Product Reviews</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Review</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {latestReviews.map((review) => (
                    <tr key={review.id}>
                      <td>{review.product}</td>
                      <td>{review.review}</td>
                      <td>{"⭐".repeat(review.rating)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
