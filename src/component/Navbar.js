import {Link, useNavigate} from "react-router-dom";
import '../style/navbar.css'
import {useEffect} from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token') !== null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/gpt-judgments-front/login');
    };
    return (
        <div className="full-width">
            <div className="menu">
                <ul>
                    <li><Link className="link-active" to="/gpt-judgments-front/">Home</Link></li>
                    {isLoggedIn && <li><Link to={"/gpt-judgments-front/query"} className="link">Query</Link></li>}
                    {!isLoggedIn && <li><Link className="link" to="/gpt-judgments-front/login">Login</Link></li>}
                    {isLoggedIn && <li><Link to={"/"} className="link" onClick={handleLogout}>Logout</Link></li>}
                </ul>
            </div>
            <nav>
                <label className="logo">Aplikacja generująca uzasadnienia wyroków sądowych</label>
                <ul>
                    <li><Link className="link-active" to="/gpt-judgments-front/">Strona glówna</Link></li>
                    {isLoggedIn && <li><Link to={"/gpt-judgments-front/query"} className="link">Generuj uzasadninie</Link></li>}
                    {!isLoggedIn && <li><Link className="link" to="/gpt-judgments-front/login">Zaloguj się</Link></li>}
                    {isLoggedIn && <li><Link to={"/gpt-judgments-front/"} className="link" onClick={handleLogout}>Wyloguj się</Link></li>}
                </ul>
            </nav>
        </div>

    );
}

export default Navbar;
