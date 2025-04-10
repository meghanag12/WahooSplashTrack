import "./App.css";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MagRecorder } from './pages/MagRecorder';
import { RegisterPage } from './pages/RegisterPage';
import { ProgressTracker } from './pages/ProgressTracker';
import { SwimmerProgressPage } from './pages/SwimmerProgressPage';  
import { StartGraph } from './pages/StartGraph';  // Import the new StartGraph page
import { UpdateSwimmer } from './pages/UpdateSwimmer';
import { UpdateIndividualSwimmer} from './pages/UpdateIndividualSwimmer';
import { Layout } from './Layout';
import { LoginPage } from './pages/LoginPage';
import { ManualEntry } from './pages/ManualEntry';
import {Navbar} from './components/Navbar'

import { useEffect } from "react";
import { redirectToLogin, getCodeFromUrl } from "./utils/auth";

function App() {

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const code = getCodeFromUrl();

    // If no access token and no code, send user to login
    if (!token && !code) {
      redirectToLogin();
    }

    // If we have a code but no token yet, send to backend (lambda) to exchange it
    if (code && !token) {
      fetch(`https://oqoe7orlk2.execute-api.us-east-1.amazonaws.com/default/login_routine`)
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            // You might want to store id_token or refresh_token too
            window.history.replaceState({}, document.title, "/"); // remove code from URL
          } else {
            console.error("Failed to get token:", data);
            redirectToLogin(); // fallback
          }
        })
        .catch((err) => {
          console.error("Login error:", err);
          redirectToLogin();
        });
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MagRecorder />} /> {}
          <Route path="/reg" element={<RegisterPage />} />
          <Route path = "/update-swimmer" element={<UpdateSwimmer />} />
          <Route path = "/update/:name" element={<UpdateIndividualSwimmer />} />
          {/* <Route path="/magnituderecorder" element={<MagRecorder />} /> */}
          <Route path="/progresstracker" element={<ProgressTracker />} />
          <Route path="/swimmer/:name" element={<SwimmerProgressPage />} />
          <Route path="/start-graph/:name" element={<StartGraph />} />
          <Route path="/manual-entry/:name" element={<ManualEntry />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
