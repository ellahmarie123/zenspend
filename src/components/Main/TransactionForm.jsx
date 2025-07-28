import React, { useState, useEffect } from "react";
import months from "../../utils/monthDropdown";
import years from "../../utils/yearDropdown";
import { supabase } from "../../supabaseClient";

export default function TransactionForm({ onAdd, userId }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [type, setType] = useState("out");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

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

  const handleMonthDropdown = (e) => {
    const monthName = e.target.value;
    const month = months.find((m) => m.name === monthName);
    setSelectedMonth(month);
  };

  const handleYearDropdown = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleCategoryDropdown = (e) => {
    const categoryDesc = e.target.value;
    const category = categoriesData.find((c) => c.description === categoryDesc);
    setSelectedCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      type,
      category: selectedCategory.id,
      amount: parseFloat(amount),
      note: note.trim(),
      date: new Date().toISOString().split("T")[0],
      month: Number(selectedMonth?.id),
      year: Number(selectedYear),
      user: userId,
    };

    console.log(selectedCategory.id);

    if (!transaction.category || isNaN(transaction.amount)) {
      alert("Please provide a valid category and amount.");
      return;
    }

    onAdd(transaction);
    setSelectedCategory("");
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
      <p>{categoriesData.id}</p>
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
      <button type="submit">Add</button>
    </form>
  );
}
