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

    console.log("Token in localStorage:", token);
    console.log("Code in URL:", code);

    // FIXED: Only redirect if there's NO token AND NO code
    if (!token && !code) {
      redirectToLogin();
    }

    if (code && !token) {
      fetch("https://oqoe7orlk2.execute-api.us-east-1.amazonaws.com/default/login_routine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      })
      .then(async (res) => {
        const data = await res.json();
        console.log("Lambda response data:", data);
      
        if (!res.ok) {
          console.error("Lambda returned error status:", res.status);
          throw new Error(data?.error || "Unknown error from Lambda");
        }
      
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          console.log("Access token set.");
          window.history.replaceState({}, document.title, "/");
        } else {
          throw new Error("access_token not found in response");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        redirectToLogin();
      });
    }
    console.log(token);
    console.log("Code in URL:", code);
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
