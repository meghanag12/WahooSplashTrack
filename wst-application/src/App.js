import "./App.css"
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import {MagRecorder} from './pages/MagRecorder'
import {RegisterPage} from './pages/RegisterPage'
import {ProgressTracker} from './pages/ProgressTracker'
import { Layout } from './Layout'

function App() {

  return (
    <Router>
      <Routes>
        <Route element = {<Layout/>}>
          <Route path = "/" element={<RegisterPage/>}/>
          <Route path = "/progresstracker" element={<ProgressTracker/>}/>
        </Route>
      </Routes>
    </Router>
  )


}

export default App 


