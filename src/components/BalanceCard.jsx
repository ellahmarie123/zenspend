import React from "react";

export default function BalanceCard({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div>
      <h2>Balance: ₱{balance.toFixed(2)}</h2>
      <p>Income: ₱{income.toFixed(2)}</p>
      <p>Expense: ₱{expense.toFixed(2)}</p>
    </div>
  );
}
