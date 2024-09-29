import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
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
import "./Dashboard.css"; // Import custom styles

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
  // Sales Growth Data for the graph
  const salesData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [1000, 2000, 1500, 3000, 2500, 3500, 4000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      {/* Row of Summary Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="glass-card">
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text>
                <h3>$45,000</h3>
              </Card.Text>
              <ProgressBar now={75} label="75%" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="glass-card">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>
                <h3>1,230 Orders</h3>
              </Card.Text>
              <ProgressBar now={60} label="60%" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="glass-card">
            <Card.Body>
              <Card.Title>Total Customers</Card.Title>
              <Card.Text>
                <h3>850 Customers</h3>
              </Card.Text>
              <ProgressBar now={80} label="80%" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sales Growth Graph (3/4 width) + Cards (1/4 width) */}
      <Row>
        {/* Sales Growth Graph taking 3/4 of the row */}
        <Col md={9}>
          <Card className="glass-card mb-4">
            <Card.Body>
              <Card.Title>Sales Growth</Card.Title>
              <Line data={salesData} />
            </Card.Body>
          </Card>
        </Col>

        {/* Cards next to the graph, stacked vertically */}
        <Col md={3}>
          <Card className="glass-card mb-4">
            <Card.Body>
              <Card.Title>Low Stock Products</Card.Title>
              <Card.Text>10 products are running low in stock.</Card.Text>
              <ProgressBar variant="danger" now={30} label="30%" />
            </Card.Body>
          </Card>

          <Card className="glass-card mb-4">
            <Card.Body>
              <Card.Title>Top Vendor</Card.Title>
              <Card.Text>Vendor ABC has achieved the highest sales.</Card.Text>
            </Card.Body>
          </Card>

          <Card className="glass-card">
            <Card.Body>
              <Card.Title>Order Fulfillment Rate</Card.Title>
              <Card.Text>
                <h3>95%</h3>
              </Card.Text>
              <ProgressBar now={95} label="95%" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
