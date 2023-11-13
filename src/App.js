import './App.css';
import './page/LoginPage'
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import QueryPage from "./page/QueryPage";
import JustificationPage from "./page/JustificationPage";
import MainPage from "./page/MainPage";
import RatePage from "./page/RatePage";
function App() {
    return (
        <Router >
            <Routes>
                <Route path={`${process.env.PUBLIC_URL}/`} element={<MainPage/>}/>
                <Route path={`${process.env.PUBLIC_URL}/register`} element={<RegisterPage/>}/>
                <Route path={`${process.env.PUBLIC_URL}/login`} element={<LoginPage/>}/>
                <Route path={`${process.env.PUBLIC_URL}/query`} element={<QueryPage/>}/>
                <Route path={`${process.env.PUBLIC_URL}/justification`} element={<JustificationPage/>}/>
                <Route path={`${process.env.PUBLIC_URL}/rate`} element={<RatePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
