import ConfirmModal from "../General Components/ConfirmModal";

export default function ConfirmAddBankModal({ onClose, onConfirm }) {
  return (
    <ConfirmModal
      onClose={onClose}
      onConfirm={onConfirm}
      message="Are you sure you want to add this bank?"
    />
  );
}
