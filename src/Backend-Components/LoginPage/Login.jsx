import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "../../assets/images/champedia-logo.png";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 10) {
            newErrors.password = "Password must be at least 10 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const res = await axios.post(
                "http://localhost:8080/login/auth",
                formData
            );

            alert("Login success");
            window.location.href = "/AdminPage";

        } catch (err) {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Champedia Logo" className="login-logo" />
                <h2 className="login-title">Login</h2>

                <form onSubmit={handleSubmit} className="login-form">

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <button type="submit">Login</button>

                </form>
            </div>
        </div>
    );
};

export default Login;
