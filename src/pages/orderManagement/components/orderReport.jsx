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
  // Generate monthly order counts and revenue from the orders data
  const monthlyData = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt);
    const monthYear = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!acc[monthYear]) {
      acc[monthYear] = { count: 0, revenue: 0 };
    }

    acc[monthYear].count += 1;
    acc[monthYear].revenue += order.totalAmount;

    return acc;
  }, {});

  // Prepare labels and datasets for the chart
  const labels = Object.keys(monthlyData);
  const orderCounts = labels.map((label) => monthlyData[label].count);
  const revenues = labels.map((label) => monthlyData[label].revenue.toFixed(2));

  // Data structure for the chart
  const data = {
    labels,
    datasets: [
      {
        label: "Orders per Month",
        data: orderCounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Revenue per Month ($)",
        data: revenues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "Monthly Order and Revenue Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count / Revenue ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
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
