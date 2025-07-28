import React, { useState, useEffect } from "react";
import "../../styles/TransactionCategoryForm.css";
import ConfirmAddCategoryModal from "../Modal/ConfirmAddCategoryModal";

export default function TransactionCategoryForm({
  isOpen,
  onClose,
  onAdd,
  userId,
}) {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("out");

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const category = {
      description,
      type,
      created_by: userId,
    };

    if (!category.description || !category.type) {
      alert("Please provide a valid description and type.");
      return;
    }

    onAdd(category);
    setDescription("");
    setType("out");
    setShowModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Category</h2>
        <form
          style={{
            backgroundColor: "var(--background-color)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Category Form</h3>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value={"in"}>Income</option>
            <option value={"out"}>Expense</option>
          </select>

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
        <ConfirmAddCategoryModal
          onConfirm={handleSubmit}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
