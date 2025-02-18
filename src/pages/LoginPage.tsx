import { useState } from "react";
import "./css/Login.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        console.log("Inloggning:", { username, password });

        try {
            await login({ username, password });
            navigate("/profile");

        } catch (error) {
            console.error("Inloggning misslyckades...:", error);
            setError("Inloggningen misslyckades, testa igen.")
        }
    };

    return (
        <div className="login-container">
            <h2>Inloggningsuppgifter</h2>

            <form onSubmit={handleSubmit} className="login-form">
                {error && (
                    <div className="errorMessage">{error}</div>
                )}

                <input
                    type="text"
                    placeholder="Användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Logga in</button>
            </form>
        </div>
    );
};

export default LoginPage;
