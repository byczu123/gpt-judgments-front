import React, {useState} from 'react';
import '../style/main_page.css';
import {Link} from "react-router-dom";
import Navbar from "../component/Navbar";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log()
    fetch('http://127.0.0.1:5000/user/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email,password: password}),
    }).then(response => {
            if (response.ok) {
              return response.json();
            } else {
            setError('Login and password are not correct');
            }
          })
          .then(data => {
              localStorage.setItem('token', data.access_token)
              navigate("/query")
          })
          .catch(error => {
            console.error('Fetch Error:', error);
          });
  };

    return (
        <div className="default">
            <Navbar/>

        <div className="center">
            <h1>Login</h1>
            <form>
                <div className="txt_field">
                    <input placeholder="Email"
                           type="email"
                           id="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <span></span>
                </div>
                <div className="txt_field">
                    <input placeholder="Password"
                           type="password"
                           id="password"
                           value={password}
                           onChange={(e)=>setPassword(e.target.value)}/>
                    <span></span>
                </div>
                <input type="submit" onClick={handleSubmit} value="Login"/>
                <div className="signup_link">Not a member? <Link to="/register">Sign up</Link></div>
                   {error && <p className="error">{error}</p>}
            </form>
        </div>
        </div>
    );
}

export default LoginPage;
