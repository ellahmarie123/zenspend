import React, { useEffect, useState } from "react";
import BalanceCard from "./components/BalanceCard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { getTransactions, saveTransactions } from "./utils/storage";
import { supabase } from "./supabaseClient";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setTransactions(data);
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
