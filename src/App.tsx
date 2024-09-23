import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import WorkerDashboard from './components/WorkerDashboard';
import List from './components/List';
import CameraSetup from './components/CameraSetup';
import Checkpoints from './components/Checkpoints';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<WorkerDashboard />} />
          <Route path="/list" element={<List />} />
          <Route path="/camera" element={<CameraSetup />} />
          <Route path="/checkpoints" element={<Checkpoints/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;