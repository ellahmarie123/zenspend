import React, { useEffect, useState } from "react";
import BalanceCard from "./components/Main/BalanceCard";
import TransactionForm from "./components/Main/TransactionForm";
import TransactionList from "./components/Main/TransactionList";
import { supabase } from "./supabaseClient";
import ConfirmDeleteModal from "./components/Modal/ConfirmDeleteModal";
import EditTransactionModal from "./components/Modal/EditTransactionModal";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setTransactions(data);
      console.log("Transactions loaded:", data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = async (transaction) => {
    const { data, error } = await supabase
      .from("transactions")
      .insert([transaction]);

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    if (data && data.length > 0) {
      setTransactions([data[0], ...transactions]);
    } else {
      console.warn("No data returned from insert operation.");
    }

    await fetchData();
  };

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

  const handleEditClick = (transactions) => {
    setEditingTransaction(transactions);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };
  const handleUpdateTransaction = async (updated) => {
    const { data, error } = await supabase
      .from("transactions")
      .update({
        type: updated.type,
        category: updated.category.trim(),
        amount: parseFloat(updated.amount),
        note: updated.note.trim(),
        date: new Date().toISOString().split("T")[0],
      })
      .eq("id", updated.id)
      .select();

    if (error) {
      console.error("Update error:", error);
    } else {
      const updatedList = transactions.map((t) =>
        t.id === updated.id ? data[0] : t
      );
      setTransactions(updatedList);
      handleCloseEditModal();
    }
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
          onEdit={handleEditClick}
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

      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        transaction={editingTransaction}
        onUpdate={handleUpdateTransaction}
      />
    </div>
  );
}
