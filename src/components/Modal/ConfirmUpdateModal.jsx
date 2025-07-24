import ConfirmModal from "../General Components/ConfirmModal";

export default function ConfirmUpdateModal({ onClose, onConfirm }) {
  return (
    <ConfirmModal
      onClose={onClose}
      onConfirm={onConfirm}
      message="Are you sure you want to update this transaction?"
    />
  );
}
