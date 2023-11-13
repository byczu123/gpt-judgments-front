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
        <Router>
            <Routes>
                <Route path="/gpt-judgments-front/" element={<MainPage/>}/>
                <Route path="/gpt-judgments-front/register" element={<RegisterPage/>}/>
                <Route path="/gpt-judgments-front/login" element={<LoginPage/>}/>
                <Route path="/gpt-judgments-front/query" element={<QueryPage/>}/>
                <Route path="/gpt-judgments-front/justification" element={<JustificationPage/>}/>
                <Route path="/gpt-judgments-front/rate" element={<RatePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
