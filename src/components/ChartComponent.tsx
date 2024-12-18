// ChartComponent.tsx

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  chartData: any; // Replace with the correct type for your chartData
}

const ChartComponent: React.FC<ChartComponentProps> = ({ chartData }) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={chartData} options={{ maintainAspectRatio: true }} />
    </div>
  );
};

export default ChartComponent;
