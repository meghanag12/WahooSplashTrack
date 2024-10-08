import "./App.css"
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import {MagRecorder} from './pages/MagRecorder'
import {ProgressTracker} from './pages/ProgressTracker'
import { Layout } from './Layout'

function App() {

  return (
    <Router>
      <Routes>
        <Route element = {<Layout/>}>
          <Route path = "/" element={<MagRecorder/>}/>
          <Route path = "/progresstracker" element={<ProgressTracker/>}/>
        </Route>
      </Routes>
    </Router>
  )


}

export default App 


