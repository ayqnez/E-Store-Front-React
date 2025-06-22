import './login.css'

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from '../Redux/Reducers/userReducer';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const user = {
            username,
            password
        }

        try {
            const response = await fetch(`http://localhost:8080/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                const data = await response.json();

                const { token, user } = data;

                dispatch(setUser(user));
                localStorage.setItem("jwtToken", token);
                navigate("/")
            } else {
                alert("Ошибка")
            }

        } catch {
            alert("Неверный логин или пароль")
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <div className="register-link">
                    <p>Don't have an account?</p>
                    <button onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Login;