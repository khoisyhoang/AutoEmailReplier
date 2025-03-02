import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Mail from "./components/Mail";
import Registration from "./components/registeration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import GoogleAuthCallback from "./GoogleAuthCallback";

function App() {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
<<<<<<< HEAD
    return (
        <Router>
            <Routes>
                <Route path="/registration" element={<Registration />} />
                <Route
                    path="/home"
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
=======
=======
>>>>>>> 2878a44aff7db039c1eae70763a0f2183e1d6b99
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> 2878a44aff7db039c1eae70763a0f2183e1d6b99
=======
>>>>>>> 2878a44aff7db039c1eae70763a0f2183e1d6b99
>>>>>>> Stashed changes
}

export default App;
