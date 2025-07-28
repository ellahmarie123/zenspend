import React, { useState, useEffect } from "react";
import "../../styles/EditTransactionModal.css";
import ConfirmUpdateModal from "./ConfirmUpdateModal";
import months from "../../utils/monthDropdown";
import years from "../../utils/yearDropdown";
import { supabase } from "../../supabaseClient";

export default function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
  onUpdate,
}) {
  const [type, setType] = useState("out");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const fetchCategoryData = async () => {
    const { data, error } = await supabase
      .from("transaction_categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setCategoriesData(data);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const incomeCategory = categoriesData.filter((c) => c.type === "in");
  const expenseCategory = categoriesData.filter((c) => c.type === "out");
  const categories = type === "in" ? incomeCategory : expenseCategory;

  useEffect(() => {
    if (transaction) {
      const matchedMonth = months.find((m) => m.id === transaction.month);
      if (matchedMonth) {
        setSelectedMonth(matchedMonth);
      }

      setType(transaction.type);
      setSelectedCategory(transaction.transaction_categories.description);
      setAmount(transaction.amount);
      setNote(transaction.note || "");
      setSelectedYear(transaction.year);
    }
  }, [transaction]);

  useEffect(() => {
    if (transaction && categoriesData.length > 0) {
      const matchedCategory = categoriesData.find(
        (cat) => cat.id === transaction.category
      );
      setSelectedCategory(matchedCategory || categoriesData[0]); // fallback
    }
  }, [transaction, categoriesData]);

  const handleMonthDropdown = (e) => {
    const monthName = e.target.value;
    const month = months.find((m) => m.name === monthName);
    setSelectedMonth(month);
    console.log({ month });
  };

  const handleYearDropdown = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleCategoryDropdown = (e) => {
    const categoryDesc = e.target.value;
    const category = categoriesData.find((c) => c.description === categoryDesc);
    setSelectedCategory(category);
  };

  const handleSubmit = () => {
    if (isNaN(parseFloat(amount))) {
      alert("Please provide a valid category and amount.");
      return;
    }

    const updatedTransaction = {
      ...transaction,
      type,
      category: selectedCategory.id,
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
            value={selectedCategory?.description || ""}
            onChange={handleCategoryDropdown}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.description}>
                {category.description}
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
