import './register.css'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const user = {
            username,
            email,
            password
        }

        try {
            const response = await fetch(`http://localhost:8080/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                alert("Registration is successful!")
                navigate("/login")
            }
        } catch {
            alert("Неверный логин или пароль")
        }
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                <div className="login-link">
                    <p>Do you have account?</p>
                    <button onClick={() => navigate("/login")}>Log in</button>
                </div>
            </div>
        </div>
    );

}

export default Register;