import React, { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("out");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const incomeCategories = ["Salary", "Business", "Investments"];
  const expenseCategories = ["Rent", "Groceries", "Utilities", "Wants"];

  const categories = type === "in" ? incomeCategories : expenseCategories;

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      type,
      category: category.trim(),
      amount: parseFloat(amount),
      note: note.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    if (!transaction.category || isNaN(transaction.amount)) {
      alert("Please provide a valid category and amount.");
      return;
    }

    onAdd(transaction);
    setCategory("");
    setAmount("");
    setNote("");
    setType("out");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Add</button>
    </form>
  );
}
