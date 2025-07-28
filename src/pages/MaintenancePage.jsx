import React, { useEffect, useState } from "react";
import TransactionCategoryList from "../components/Maintenance/TransactionCategoryList";
import { supabase } from "../supabaseClient";

export default function App({ user }) {
  const [categories, setCategories] = useState([]);

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

  const handleAddcategory = async (category) => {
    const { data, error } = await supabase
      .from("transaction_categories")
      .insert([category]);

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    if (data && data.length > 0) {
      setCategories([data[0], ...categories]);
    } else {
      console.warn("No data returned from insert operation.");
    }

    await fetchData();
  };

  return (
    <div className="app-container">
      <div className="maintenance-item">
        <TransactionCategoryList userId={user.id} />
      </div>
    </div>
  );
}
