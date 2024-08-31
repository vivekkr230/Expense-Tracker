import React, { useEffect, useState } from "react";
import "../styles/Dashboard/ExpenseForm.css";
import { fetchExpenseById, updateExpense } from "../services/apiService";

const EditExpense = ({ expenseId, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    payAmount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const getExpenseDetails = async () => {
      try {
        const response = await fetchExpenseById(expenseId);
        console.log("response", response);
        setFormData(response.data);
      } catch (err) {
        console.error("error", err.message);
      }
    };
    getExpenseDetails();
  }, [expenseId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedExpense = await updateExpense(expenseId, formData);
      onUpdate(updatedExpense.data); // Notify parent component about the update
    } catch (err) {
      console.error("error", err.message);
    }
  };

  return (
    <div className="popup-form-container">
      <div className="popup-form">
        <span className="close-button" onClick={onCancel}>
          &times;
        </span>
        <h2>Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <label>Pay Amount (INR):</label>
          <input
            type="number"
            name="payAmount"
            min={0}
            value={formData.payAmount}
            onChange={handleChange}
            required
          />

          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="submit-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
