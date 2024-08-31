import React, { useEffect, useState } from "react";
import "../styles/Dashboard/Dashboard.css";
import ExpenseForm from "./ExpenseForm";
import { fetchExpense } from "../services/apiService";
import EditExpense from "./EditExpense";
import { useNavigate } from "react-router-dom";

export default function ExpenseDashboard() {
  const [username, setUsername] = useState(null);
  const [expenseList, setExpenseList] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const navigate = useNavigate();

  //get username from sessionStorage.
  useEffect(() => {
    const ActiveUser = sessionStorage.getItem("username");
    console.log("username", ActiveUser);
    setUsername(ActiveUser);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("Session-token");
    navigate("/", { replace: true });
  };

  // useEffect(() => {
  //   const data = await fetchExpense();
  //   setExpenseList(data);
  //   // console.log("fetch", expenseList);
  // }, []);

  ///fomate of date and Time
  function formatDateTime(inputDate) {
    if (inputDate == null || inputDate == "") {
      return inputDate;
    } else {
      const date = new Date(inputDate);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
      const ampm = date.getHours() >= 12 ? "PM" : "AM";
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
  }

  useEffect(() => {
    const GetExpense = async () => {
      try {
        const response = await fetchExpense();
        console.log("Get expense list", response);
        setExpenseList(response.data);
        // console.log("expense", expenseList);
      } catch (err) {
        console.error("error", err.message);
        // setError("An error occurred");
      }
    };

    GetExpense();
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenseList((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleEditClick = (id) => {
    setSelectedExpenseId(id);
  };

  const handleExpenseUpdate = (updatedExpense) => {
    setExpenseList((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      )
    );
    setSelectedExpenseId(null); // Close the edit form after update
  };

  return (
    <>
      <div className="displayHeading">
        <h2>Expense Tracker</h2>
        <h1 className="user-name">Hi {username}</h1>
        <button className="Logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* button to create expense */}

      <div className="Expense-table">
        {/* expense component */}
        <ExpenseForm onAddExpense={handleAddExpense} />

        <table>
          <thead>
            <tr>
              {/* <th>Serial No</th> */}
              <th>Serial No.</th>
              <th>Amount ₹</th>
              <th>Category</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>Update Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenseList?.length > 0 &&
              expenseList?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.payAmount}</td>
                  <td>{user.category}</td>
                  <td>{user.description}</td>
                  <td>{formatDateTime(user.createddt)}</td>
                  <td>{formatDateTime(user.updateddt)}</td>

                  <td>
                    {/* <EditExpense /> */}
                    <button
                      onClick={() => handleEditClick(user._id)}
                      className="edit-button"
                    >
                      {/* <i className="fas fa-solid fa-pen-to-square"></i>  */}
                      {/* <i className="fas fa-regular fa-pen-to-square"></i> */}
                      ✍️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Show EditExpense form if an expense is selected for editing */}
        {selectedExpenseId && (
          <EditExpense
            expenseId={selectedExpenseId}
            onUpdate={handleExpenseUpdate}
            onCancel={() => setSelectedExpenseId(null)}
          />
        )}
      </div>
    </>
  );
}
