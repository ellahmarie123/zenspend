import React, { useEffect, useState } from "react";
import BalanceCard from "./components/Main/BalanceCard";
import TransactionForm from "./components/Main/TransactionForm";
import TransactionList from "./components/Main/TransactionList";
import { supabase } from "./supabaseClient";
import ConfirmDeleteModal from "./components/Modal/ConfirmDeleteModal";

export default function DeleteTransaction({ id }) {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const confirmDeleteTransaction = (id) => {
    setTransactionToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!transactionToDelete) return;

    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", transactionToDelete);

    if (error) {
      console.error("Delete error:", error.message);
    } else {
      setTransactions(transactions.filter((t) => t.id !== transactionToDelete));
    }

    setShowModal(false);
    setTransactionToDelete(null);
  };

  return (
    <div className="app-container">
      <div className="left-column">
        <BalanceCard transactions={transactions} />
        <TransactionForm onAdd={handleAddTransaction} />
      </div>

      <div className="right-column">
        <TransactionList
          transactions={transactions}
          onDelete={confirmDeleteTransaction}
          onUpdate={confirmDeleteTransaction}
        />
      </div>

      {showModal && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onClose={() => {
            setShowModal(false);
            setTransactionToDelete(null);
          }}
        />
      )}
    </div>
  );
}
