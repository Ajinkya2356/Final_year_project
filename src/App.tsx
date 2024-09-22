import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import WorkerDashboard from './components/WorkerDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<WorkerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;