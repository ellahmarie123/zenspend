import React from "react";
import "../styles/TransactionList.css";

export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul className="transaction-items">
        {transactions.map((t) => (
          <li
            key={t.id}
            className={`transaction-item ${
              t.type === "in" ? "income" : "expense"
            }`}
          >
            <button className="delete-btn" onClick={() => onDelete(t.id)}>
              🗑️
            </button>
            <div className="transaction-details">
              [{t.date}] {t.type === "in" ? "+" : "-"} ₱{t.amount.toFixed(2)} -{" "}
              {t.category} {t.note && `(${t.note})`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
