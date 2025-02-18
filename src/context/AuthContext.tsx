import { createContext, useState, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

// Skapa Context för autentisering
const AuthContext = createContext<AuthContextType | null>(null);

// Interface för props som används i AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider för autentisering, sätter värdena till AuthContext
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    // Funktion för logga in
    const login = async (credentials: LoginCredentials): Promise<void> => {
        try {
            const response = await fetch(`http://localhost:5000/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
                credentials: "include"              // Skickar med cookies
            });

            if (!response.ok) throw new Error("Misslyckad inloggning");

            // Om ok inlogg hämta användardata från responsen
            const data = await response.json() as AuthResponse;
            console.log("Inloggningsdata:", data);

            if (data.user) {
                // Sätt användaren i state
                setUser(data.user);
            } else {
                console.error("Inloggning misslyckades: Ingen användardata");
                throw new Error("Inloggning misslyckades");
            }
        } catch (error) {
            console.error("Inloggning misslyckades:", error);
            throw new Error("Inloggning misslyckades");
        }
    };

    // Funktion för att logga ut
    const logout = () => {
        setUser(null);
    };

    return (
        // Providern sätter värdena till child-komponenterna
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook för att använda authContexten 
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en provider");
    }

    return context; 
};
