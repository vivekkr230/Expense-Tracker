import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/ExpenseDashboard";
// import ExpenseForm from "../pages/ExpenseForm";
// import Signup from "../components/SignupComponent"
import SignupPage from "../pages/SignUpPage"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/signup" element={<Signup/>} /> */}
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/dashboard" element={<ExpenseForm />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
