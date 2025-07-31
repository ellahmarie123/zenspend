import React, { useState, useEffect } from "react";
import "../../styles/MaintenanceForm.css";
import ConfirmAddBankModal from "../Modal/ConfirmAddCategoryModal";

export default function TransactionBankForm({
  isOpen,
  onClose,
  onAdd,
  userId,
}) {
  const [description, setDescription] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bank = {
      description,
      created_by: userId,
    };

    if (!bank.description) {
      alert("Please provide a valid description.");
      return;
    }

    onAdd(bank);
    setDescription("");
    setShowModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Bank</h2>
        <form
          style={{
            backgroundColor: "var(--background-color)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Bank Form</h3>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <ConfirmAddBankModal
          onConfirm={handleSubmit}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
