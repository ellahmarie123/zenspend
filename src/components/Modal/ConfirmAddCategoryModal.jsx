import ConfirmModal from "../General Components/ConfirmModal";

export default function ConfirmAddCategoryModal({ onClose, onConfirm }) {
  return (
    <ConfirmModal
      onClose={onClose}
      onConfirm={onConfirm}
      message="Are you sure you want to add this category?"
    />
  );
}
