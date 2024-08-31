import { useState } from "react";
import "../styles/login/SignupPage.css";
import { signupUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";



const SignupPage = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            name: "",
            age: "",
            password: "",
            confirmpassword :""
    });

    const handleCancel = () => {
        setFormData({
            name: "",
            age: "",
            password: "",
            confirmpassword: "",
        });
        setError(null);
        setSuccess(null);
    };


    const handleChange = (e) => {
        setError(null);
        setSuccess(null);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            console.log('formdata',formData);
            if (formData.password !== formData.confirmpassword) {
                setError("Passwords do not match");
                return;
            }
            const response = await signupUser({ formData });
            console.log('response',response);


            if (response.success == true){
                console.log('ram')
                setError(null);
                setSuccess(response.message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
                return;
            }else {
                console.log('shyam')
                setSuccess(null);
                setError(response.message);
                return;
            }

        } catch (err) {
            console.error("error", err.message);
            setSuccess(null);
            setError(err.message);
            setTimeout(() => {
            }, 1000);
        }
    };




    return (
        <div className="popup-overlay">
            <div className="signup-popup">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignup}>
                    <div className="input-container">
                    <i className="fas fa-solid fa-user"> </i>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <i className="fas fa-solid fa-list-ol"></i>
                        <input
                            type="text"
                            placeholder="Age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmpassword"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    {success && <p className="success-msg">{success}</p>}
                    <div className="button-group">
                        <button type="submit" className="signup-button">
                            Submit
                        </button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            Reset
                        </button>
                    </div>
                    <p className="login">
                       Back To Login? <a href="/" >
                            Login
                        </a>
                    </p> 
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
