import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    // state variables for email and passwords
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    // state variable for error messages
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate("/login");
    }

    // handle change events for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    // handle submit event for the form
    const handleSubmit = (e) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok)
                        setError("Successful register.");
                    else
                        setError("Error registering.");
                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error registering.");
                });
        }
    };

    return (
        <div className="container">
            <h3>Register</h3>
            <form className="text-start" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleLoginClick}>Go to Login</button>
            </form>
            {error && <p className="error mt-3">{error}</p>}
        </div>
    );
}

export default Register;
