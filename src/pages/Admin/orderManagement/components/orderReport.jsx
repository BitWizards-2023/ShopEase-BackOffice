import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, Row, Col } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrderReports = ({ orders }) => {
  // Generate monthly order counts from the orders data
  const orderCounts = orders.reduce((acc, order) => {
    const month = new Date(order.date).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Data structure for the chart
  const data = {
    labels: Object.keys(orderCounts),
    datasets: [
      {
        label: "Orders per Month",
        data: Object.values(orderCounts),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options for styling and behavior
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Order Overview",
      },
    },
  };

  return (
    <Row className="my-4">
      <Col md={12}>
        <Card>
          <Card.Body>
            <Card.Title>Order Reports</Card.Title>
            <Bar data={data} options={options} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderReports;
