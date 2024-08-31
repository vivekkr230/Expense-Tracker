export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5555/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "Network error" };
  }
};

//SignUp user submit form
export const signupUser = async (formData) => {
  try {
    const response = await fetch("http://localhost:5555/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: error.message };
  }
};

//Submit expense via ExpenseForm
export const submitExpense = async ({ formData, token }) => {
  try {
    const response = await fetch("http://localhost:5555/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage?.getItem("Session-token"),
      },
      body: JSON.stringify({ formData, token }),
    });

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error during submit expense:", error);
    return { success: false, message: "Network error" };
  }
};

//Fetch expense for Dashboard table
export const fetchExpense = async () => {
  try {
    const response = await fetch(
      "http://localhost:5555/api/users/transactiondataAcToUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage?.getItem("Session-token"),
        },
        // body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error during fetching expense:", error);
    return { success: false, message: "Network error" };
  }
};

//fetch expence data by Id.
export const fetchExpenseById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5555/api/transaction/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage?.getItem("Session-token"),
        },
        // body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error during fetching expense by-ID:", error);
    return { success: false, message: "Network error" };
  }
};

// update expense
export const updateExpense = async (id, updateData) => {
  try {
    const response = await fetch(
      "http://localhost:5555/api/transaction/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage?.getItem("Session-token"),
        },
        body: JSON.stringify({ id, updateData }),
      }
    );

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error during Update expense:", error);
    return { success: false, message: "Network error" };
  }
};
