/* eslint-disable no-var */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            setError("");
            var loginurl = "";
            if (rememberme) loginurl = "/login?useCookies=true";
            else loginurl = "/login?useSessionCookies=true";

            fetch(loginurl, {
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
                    if (data.ok) {
                        setError("Successful Login.");
                        window.location.href = "/";
                    } else setError("Error Logging In.");
                })
                .catch((error) => {
                    console.error(error);
                    setError("Error Logging in.");
                });
        }
    };

    return (
        <div className="container">
            <h3>Login</h3>
            <form className="" onSubmit={handleSubmit}>
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
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberme"
                        name="rememberme"
                        checked={rememberme}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="rememberme">Remember Me</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleRegisterClick}>Register</button>
            </form>
            {error && <p className="error mt-3">{error}</p>}
        </div>
    );
}

export default Login;
