import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Mail from "./components/Mail";
import Registration from "./components/registeration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import GoogleAuthCallback from "./GoogleAuthCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
        <Route
          path="/mail"
          element={
            <>
              <Header />
              <Mail />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
