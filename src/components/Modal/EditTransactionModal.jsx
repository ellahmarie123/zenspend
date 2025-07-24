import React, { useState, useEffect } from "react";
import "../../styles/EditTransactionModal.css";

export default function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
  onUpdate,
}) {
  const [type, setType] = useState("out");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const incomeCategories = ["Salary", "Business", "Investments"];
  const expenseCategories = ["Rent", "Groceries", "Utilities", "Wants"];

  const categories = type === "in" ? incomeCategories : expenseCategories;

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setCategory(transaction.category);
      setAmount(transaction.amount);
      setNote(transaction.note || "");
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTransaction = {
      ...transaction,
      type,
      category: category.trim(),
      amount: parseFloat(amount),
      note: note.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    if (!category.trim() || isNaN(parseFloat(amount))) {
      alert("Please provide a valid category and amount.");
      return;
    }

    if (typeof onUpdate !== "function") {
      console.error("onUpdate is not a function", onUpdate);
      return;
    }

    onUpdate(updatedTransaction);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Transaction</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "var(--background-color)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Transaction Form</h3>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value={"in"}>Income</option>
            <option value={"out"}>Expense</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={!categories.length} // Disable if no categories
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit" className="save-btn" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
