import React, { useState, useEffect } from "react";
import "../../styles/EditTransactionModal.css";
import ConfirmUpdateModal from "./ConfirmUpdateModal";
import months from "../../utils/monthDropdown";
import years from "../../utils/yearDropdown";

export default function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
  onUpdate,
}) {
  const currentYear = new Date().getFullYear();
  const [type, setType] = useState("out");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const incomeCategories = ["Salary", "Business", "Investments"];
  const expenseCategories = ["Rent", "Groceries", "Utilities", "Wants"];
  const categories = type === "in" ? incomeCategories : expenseCategories;

  useEffect(() => {
    if (transaction) {
      const matchedMonth = months.find((m) => m.id === transaction.month);
      if (matchedMonth) {
        setSelectedMonth(matchedMonth);
      }

      setType(transaction.type);
      setCategory(transaction.category);
      setAmount(transaction.amount);
      setNote(transaction.note || "");
      setSelectedYear(transaction.year);
    }
  }, [transaction]);

  const handleMonthDropdown = (e) => {
    const monthName = e.target.value;
    const month = months.find((m) => m.name === monthName);
    setSelectedMonth(month);
    console.log({ month });
  };

  const handleYearDropdown = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = () => {
    if (!category.trim() || isNaN(parseFloat(amount))) {
      alert("Please provide a valid category and amount.");
      return;
    }

    const updatedTransaction = {
      ...transaction,
      type,
      category: category.trim(),
      amount: parseFloat(amount),
      note: note.trim(),
      date: new Date().toISOString().split("T")[0],
      month: Number(selectedMonth?.id),
      year: Number(selectedYear),
    };

    onUpdate(updatedTransaction);
    setShowModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Transaction</h2>
        <form
          style={{
            backgroundColor: "var(--background-color)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Transaction Form</h3>
          <select
            value={selectedMonth?.name || ""}
            onChange={handleMonthDropdown}
          >
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
          <div className="modal-buttons">
            <button
              type="button"
              className="save-btn"
              onClick={() => setShowModal(true)}
            >
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <ConfirmUpdateModal
          onConfirm={handleSubmit}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
