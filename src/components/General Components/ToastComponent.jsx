import React, { useState, useEffect } from "react";
import "../../styles/ToastComponent.css";

export default function ToastComponent({ input }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (input) {
      setShow(true);
      console.log({ input });
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [input]);
  console.log("Toast");
  return (
    <div className={`toast-container ${show ? "show" : ""}`}>
      <p>{input}</p>
    </div>
  );
}
