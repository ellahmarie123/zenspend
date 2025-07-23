import React from "react";

export default function TransactionList({ transactions }) {
  return (
    <div>
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((t) => (
          <li
            key={t.id}
            className={`transaction-item ${
              t.type === "in" ? "income" : "expense"
            }`}
          >
            [{t.date}] {t.type === "in" ? "+" : "-"} ₱{t.amount.toFixed(2)} -{" "}
            {t.category} {t.note && `(${t.note})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
