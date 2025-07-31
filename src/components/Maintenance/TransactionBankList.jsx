import React, { useState, useEffect } from "react";
import "../../styles/MaintenanceList.css";
import TransactionBankForm from "./TransactionBankForm";
import { supabase } from "../../supabaseClient";

export default function TransactionBankList({ userId, onDelete, onEdit }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [bank, setBank] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("transaction_banks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setBank(data);
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

  const handleAddBank = async (bank) => {
    const { data, error } = await supabase
      .from("transaction_banks")
      .insert([bank]);

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    if (data && data.length > 0) {
      setBank([data[0], ...bank]);
    } else {
      console.warn("No data returned from insert operation.");
    }

    await fetchData();
    setShowAddModal(false);
  };

  return (
    <div className="maintenance-list">
      <h3>Transaction Bank</h3>
      <button className="maint-add-button" onClick={handleAddButton}>
        Add
      </button>
      <ul className="maintenance-items">
        {bank.map((b) => (
          <li key={b.id} className="maintenance-item">
            <button className="delete-btn" onClick={() => onDelete(b.id)}>
              🗑️
            </button>
            <button className="update-btn" onClick={() => onEdit(b)}>
              ✏️
            </button>
            <div className="maintenance-details">{b.description}</div>
          </li>
        ))}
      </ul>

      <TransactionBankForm
        isOpen={showAddModal}
        onClose={handleCloseAddModal}
        onAdd={handleAddBank}
        userId={userId}
      />
    </div>
  );
}
