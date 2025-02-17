import { NavLink } from "react-router-dom";
import "../components/Header.css"; 

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                            Hem
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                            Om sidan
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
