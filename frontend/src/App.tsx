import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/HomeScreen';

function App() {
  return (
    <Router>
      <div className="fixed inset-0 bg-gray-900 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/user" element={<div>User Page (Coming Soon)</div>} />
          <Route path="/solver" element={<div>Solver Page (Coming Soon)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;