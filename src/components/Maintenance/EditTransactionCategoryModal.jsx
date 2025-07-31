import React, { useState, useEffect } from "react";
import "../../styles/MaintenanceForm.css";
import ConfirmUpdateModal from "../Modal/ConfirmUpdateModal";

export default function EditTransactionCategoryModal({
  isOpen,
  onClose,
  category,
  onUpdate,
}) {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("out");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (category?.description && category?.type) {
      setDescription(category.description);
      setType(category.type);
    }
  }, [category]);

  const handleSubmit = () => {
    if (!description || !type) {
      alert("Please provide a valid description and type.");
      return;
    }

    const updatedCategory = {
      ...category,
      description,
      type,
    };

    onUpdate(updatedCategory);
    setShowModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Category</h2>
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
