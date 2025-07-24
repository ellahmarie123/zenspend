import React from "react";

export default function ConfirmModal({ onClose, onConfirm, message }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>{message}</h3>
        <div style={styles.buttons}>
          <button onClick={onConfirm} style={styles.confirm}>
            Confirm
          </button>
          <button onClick={onClose} style={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    maxWidth: "300px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },

  buttons: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-around",
  },

  confirm: {
    backgroundColor: "var(--primary-color)",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },

  cancel: {
    backgroundColor: "var(--tertiary-color)",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
