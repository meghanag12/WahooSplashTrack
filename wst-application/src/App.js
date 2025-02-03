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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {}
        <Route element={<Layout />}>
          <Route path="/reg" element={<RegisterPage />} />
          <Route path = "/update-swimmer" element={<UpdateSwimmer />} />
          <Route path = "/update/:name" element={<UpdateIndividualSwimmer />} />
          <Route path="/magnituderecorder" element={<MagRecorder />} />
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
