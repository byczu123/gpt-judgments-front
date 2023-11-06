import './App.css';
import './page/LoginPage'
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import QueryPage from "./page/QueryPage";
import JustificationPage from "./page/JustificationPage";
import MainPage from "./page/MainPage";
import RatePage from "./page/RatePage";
function App() {
    return (
        <Router >
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/query" element={<QueryPage/>}/>
                <Route path="/justification" element={<JustificationPage/>}/>
                <Route path="/rate" element={<RatePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
