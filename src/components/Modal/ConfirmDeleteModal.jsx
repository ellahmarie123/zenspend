import ConfirmModal from "../General Components/ConfirmModal";

export default function ConfirmDeleteModal({ onClose, onConfirm }) {
  return (
    <ConfirmModal
      onClose={onClose}
      onConfirm={onConfirm}
      message="Are you sure you want to delete this item?"
    />
  );
}
