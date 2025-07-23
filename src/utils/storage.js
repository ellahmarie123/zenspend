export const getTransactions = () => {
  try {
    const data = localStorage.getItem("zenspend_transactions");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Invalid transactions in localStorage:", e);
    return [];
  }
};

export const saveTransactions = (transactions) => {
  localStorage.setItem("zenspend_transactions", JSON.stringify(transactions));
};
