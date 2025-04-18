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
import  CognitoLogin  from './pages/CognitoLogin';
import { useEffect } from "react";
import { redirectToLogin, getCodeFromUrl } from "./utils/auth";
import { RequireAuth } from './components/RequireAuth';
function App() {

  return (
    <Router>
      <></>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CognitoLogin />} /> {}
          <Route path="/reg" element={<RequireAuth><RegisterPage /> </RequireAuth>} />
          <Route path="/mag" element={<RequireAuth><MagRecorder /> </RequireAuth>} />
          <Route path = "/update-swimmer" element={<RequireAuth><UpdateSwimmer /> </RequireAuth>} />
          <Route path = "/update/:name" element={<RequireAuth> <UpdateIndividualSwimmer /> </RequireAuth>} />
          {/* <Route path="/magnituderecorder" element={<MagRecorder />} /> */}
          <Route path="/progresstracker" element={<RequireAuth><ProgressTracker /></RequireAuth>} />
          <Route path="/swimmer/:name" element={<RequireAuth><SwimmerProgressPage /> </RequireAuth>} />
          <Route path="/start-graph/:name" element={<RequireAuth><StartGraph /></RequireAuth>} />
          <Route path="/manual-entry/:name" element={<RequireAuth><ManualEntry /></RequireAuth>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
