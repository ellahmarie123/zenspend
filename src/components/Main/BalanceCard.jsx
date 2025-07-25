import React from "react";
import { Chart, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BalanceCard({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  const ChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#00809d", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  const ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={styles.balanceCard}>
      <h2 style={styles.text}>Balance: ₱{balance.toFixed(2)}</h2>
      <p style={styles.textp}>Income: ₱{income.toFixed(2)}</p>
      <p style={styles.textp}>Expense: ₱{expense.toFixed(2)}</p>
      <div style={styles.chartContainer}>
        <Doughnut data={ChartData} options={ChartOptions} />
      </div>
    </div>
  );
}

const styles = {
  balanceCard: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#fff",
    textAlign: "center",
    marginBottom: "8px",
    backgroundColor: "var(--background-color)",
  },

  text: {
    margin: "0 0 10px",
    fontSize: "24px",
    color: "#333",
    textAlign: "left",
  },

  textp: {
    margin: "0 0 10px",
    fontSize: "18px",
    color: "#555",
    textAlign: "left",
  },

  chartContainer: {
    width: "100%",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
