import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import WorkerDashboard from './components/WorkerDashboard';
import List from './components/List';
import CameraSetup from './components/CameraSetup';
import Checkpoints from './components/Checkpoints';
import { Provider } from 'react-redux';
import store from './store';
import AdminDashboard from './components/AdminDashboard';
import Layout from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<WorkerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/list" element={<List />} />
            <Route path="/camera" element={<CameraSetup />} />
            <Route path="/checkpoints" element={<Checkpoints />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;