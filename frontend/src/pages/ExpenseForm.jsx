import React, { useEffect, useState } from "react";
import "../styles/Dashboard/ExpenseForm.css";
import { submitExpense } from "../services/apiService";

const ExpenseForm = ({ onAddExpense }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    payAmount: "",
    category: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [emessage, seteMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showePopup, seteShowPopup] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    try {
      const addExpense = await submitExpense({ formData });
      console.log("add Expense response", addExpense);
      onAddExpense(addExpense.data);
      // Set the message and show the popup
      // if (addExpense.message == "Expanse Added") {
      //   setMessage(addExpense.message);
      //   setShowPopup(true);
      // } else {
      //   seteMessage(addExpense.message);
      //   seteShowPopup(true);
      // }
      // setTimeout(() => {
      //   setShowPopup(false);
      //   seteShowPopup(false);
      //   window.location.reload();
      // }, 2000);
    } catch (err) {
      console.error("error", err.message);
      // setMessage(err.message);
      // seteMessage(err.message);
      // setShowPopup(true);
      // seteShowPopup(true);
      // setTimeout(() => {
      //   setShowPopup(false);
      //   seteShowPopup(false);
      // }, 1000);
    }

    setShowForm(false); // Close the form after submission
  };

  return (
    <div>
      <button className="createExpenseBtn" onClick={toggleForm}>
        Add Expense
      </button>

      {showForm && (
        <div className="popup-form-container">
          <div className="popup-form">
            <span className="close-button" onClick={toggleForm}>
              &times;
            </span>
            <h2>Expense Form</h2>
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
                aria-placeholder="Category List"
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
                <option value="Others">Others</option>{" "}
              </select>
              <label>Description(Optional):</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Popup or Toast Notification */}
      {showPopup && <div className="popup">{message}</div>}
      {showePopup && <div className="perror">{emessage}</div>}
    </div>
  );
};

export default ExpenseForm;
