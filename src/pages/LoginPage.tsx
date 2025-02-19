import { useState, useEffect } from "react";
import "./css/Login.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    // States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // login-funktionen och användaren från AuthContext
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // Om användaren redan är inloggad, skicka till profilsidan
    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    }, [user, navigate]);

    // Submit för fomuläret
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            await login({ username, password });   // login-funktionen från AuthContext
            navigate("/profile");                  // Till Mina sidor vid lyckad inloggning

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
