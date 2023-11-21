import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import '../style/main_page.css';
import Navbar from "../component/Navbar";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"


const LoginPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://16.171.225.22:5000/user/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email,password: password}),
    }).then(response => {
            if (response.ok) {
              return response.json();
            } else {
                toast.error('Nieprawidłowe dane.', {
                    position: "bottom-center",
                    toastId: "invalid-credentials-toast"
                    });
            }
          })
          .then(data => {
              localStorage.setItem('token', data.access_token)
              navigate("/gpt-judgments-front/query")
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
                    <input placeholder="Hasło"
                           type="password"
                           id="password"
                           value={password}
                           onChange={(e)=>setPassword(e.target.value)}/>
                    <span></span>
                </div>
                <input type="submit" onClick={handleSubmit} value="Login"/>
            </form>
        </div>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
        </div>
    );
}

export default LoginPage;
