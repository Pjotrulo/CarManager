import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.scss';
import StartPage from "./components/StartPage";
import Client from "./components/Client";
import Garage from "./components/Garage";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/client" element={<Client />}/>
                <Route path="/garage" element={<Garage />}/>
            </Routes>
        </Router>
    </>
  );
}

export default App;
