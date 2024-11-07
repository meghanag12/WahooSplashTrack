import "./App.css";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MagRecorder } from './pages/MagRecorder';
import { RegisterPage } from './pages/RegisterPage';
import { ProgressTracker } from './pages/ProgressTracker';
import { SwimmerProgressPage } from './pages/SwimmerProgressPage';  
import { Layout } from './Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/progresstracker" element={<ProgressTracker />} />
          {/* Add route for the SwimmerProgress page */}
          <Route path="/swimmer/:id" element={<SwimmerProgressPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
