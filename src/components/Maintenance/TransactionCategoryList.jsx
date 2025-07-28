import React, { useState, useEffect } from "react";
import "../../styles/TransactionCategoryList.css";
import TransactionCategoryForm from "../Maintenance/TransactionCategoryForm";
import { supabase } from "../../supabaseClient";

export default function TransactionCategoryList({ userId, onDelete, onEdit }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("transaction_categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setCategory(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddButton = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddCategory = async (category) => {
    const { data, error } = await supabase
      .from("transaction_categories")
      .insert([category]);

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    if (data && data.length > 0) {
      setCategory([data[0], ...category]);
    } else {
      console.warn("No data returned from insert operation.");
    }

    await fetchData();
    setShowAddModal(false);
  };

  return (
    <div className="transaction-category-list">
      <h3>Transaction Category</h3>
      <button className="cat-add-button" onClick={handleAddButton}>
        Add
      </button>
      <ul className="transaction-category-items">
        {category.map((c) => (
          <li key={c.id} className="transaction-category-item">
            <button className="delete-btn" onClick={() => onDelete(c.id)}>
              🗑️
            </button>
            <button className="update-btn" onClick={() => onEdit(c)}>
              ✏️
            </button>
            <div className="transaction-category-details">
              [{c.type === "in" ? "Income" : "Expense"}] {c.description}
            </div>
          </li>
        ))}
      </ul>

      <TransactionCategoryForm
        isOpen={showAddModal}
        onClose={handleCloseAddModal}
        onAdd={handleAddCategory}
        userId={userId}
      />
    </div>
  );
}
