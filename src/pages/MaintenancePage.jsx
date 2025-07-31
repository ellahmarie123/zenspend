import React, { useEffect, useState } from "react";
import TransactionCategoryList from "../components/Maintenance/TransactionCategoryList";
import TransactionBankList from "../components/Maintenance/TransactionBankList";
import { supabase } from "../supabaseClient";
import ConfirmDeleteModal from "../components/Modal/ConfirmDeleteModal";
import EditTransactionCategoryModal from "../components/Maintenance/EditTransactionCategoryModal";
import "../styles/MaintenancePage.css";

export default function App({ user }) {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("transaction_categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setCategories(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDeleteTransaction = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const handleEditClick = (transactions) => {
    setEditingTransaction(transactions);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const { error } = await supabase
      .from("transaction_categories")
      .delete()
      .eq("id", itemToDelete);

    if (error) {
      console.error("Delete error:", error.message);
    } else {
      setCategories(categories.filter((c) => c.id !== itemToDelete));
    }

    setShowModal(false);
    setItemToDelete(null);
    await fetchData();
  };

  const handleUpdateTransaction = async (updated) => {
    const { data, error } = await supabase
      .from("transaction_categories")
      .update({
        description: updated.description,
        type: updated.type,
      })
      .eq("id", updated.id)
      .select();

    if (error) {
      console.error("Update error:", error);
    } else {
      const updatedList = categories.map((t) =>
        t.id === updated.id ? data[0] : t
      );
      setCategories(updatedList);
      handleCloseEditModal();
    }

    await fetchData();
  };

  return (
    <div className="app-maintenance-container ">
      <div className="maintenance-item">
        <TransactionCategoryList
          userId={user.id}
          onDelete={confirmDeleteTransaction}
          onEdit={handleEditClick}
        />
        <TransactionBankList
          userId={user.id}
          onDelete={confirmDeleteTransaction}
          onEdit={handleEditClick}
        />
      </div>
      {showModal && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onClose={() => {
            setShowModal(false);
            setItemToDelete(null);
          }}
        />
      )}

      <EditTransactionCategoryModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        category={editingTransaction}
        onUpdate={handleUpdateTransaction}
      />
    </div>
  );
}
