import React, { useState } from "react";
import months from "../../utils/monthDropdown";
import years from "../../utils/yearDropdown";

export default function TransactionForm({ onAdd }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [type, setType] = useState("out");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const incomeCategories = ["Salary", "Business", "Investments"];
  const expenseCategories = ["Rent", "Groceries", "Utilities", "Wants"];
  const categories = type === "in" ? incomeCategories : expenseCategories;

  const handleMonthDropdown = (e) => {
    const monthName = e.target.value;
    const month = months.find((m) => m.name === monthName);
    setSelectedMonth(month);
  };

  const handleYearDropdown = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      type,
      category: category.trim(),
      amount: parseFloat(amount),
      note: note.trim(),
      date: new Date().toISOString().split("T")[0],
      month: Number(selectedMonth?.id),
      year: Number(selectedYear),
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
    setSelectedMonth(months[currentMonth]);
    setSelectedYear(currentYear);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "var(--background-color)",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Transaction Form</h3>
      <select value={selectedMonth?.name || ""} onChange={handleMonthDropdown}>
        {months.map((month) => (
          <option key={month.id} value={month.name}>
            {month.name}
          </option>
        ))}
      </select>

      <select value={selectedYear} onChange={handleYearDropdown}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

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
