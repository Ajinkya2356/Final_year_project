import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import WorkerDashboard from './components/WorkerDashboard';
import List from './components/List';
import CameraSetup from './components/CameraSetup';
import Checkpoints from './components/Checkpoints';
import Navbar from './components/Navbar';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './store';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
          {
            isAuthenticated && <Navbar />
          }
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<WorkerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/list" element={<List />} />
            <Route path="/camera" element={<CameraSetup />} />
            <Route path="/checkpoints" element={<Checkpoints />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;