import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.scss';
import StartPage from "./components/StartPage";
import Client from "./components/client/Client";
import Garage from "./components/garage/Garage";

function App() {

    return (
        <>
            <Router basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<StartPage/>}/>
                    <Route path="/client" element={<Client/>}/>
                    <Route path="/garage" element={<Garage/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
