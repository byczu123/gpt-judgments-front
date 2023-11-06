import {useState} from 'react';
import '../style/main_page.css';
import {Link} from "react-router-dom";
import Navbar from "../component/Navbar";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            console.log('Registration data:', email, password);
        } else {
            alert("Passwords don't match. Please re-enter.");
            setPassword("")
            setConfirmPassword("");
        }
        const data = {
            email,
            password
        };

        fetch("http://localhost:5000/user/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response
            ) => response.json())
            .then((data) => {
                if (data.message) {
                    console.log(data.message);
                }

            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <div className="default">
            <Navbar/>
            <div className="center">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input type="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)} placeholder="Login"/>
                        <span></span>
                    </div>
                    <div className="txt_field">
                        <input type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"/>
                        <span></span>
                    </div>
                    <div className="txt_field">
                        <input type="password"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"/>
                        <span></span>
                    </div>
                    <input type="submit" value="Register"/>
                    <div className="signup_link">Already have an account? <Link to="/login">Log in</Link></div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
