import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/HomeScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/user" element={<div>User Page (Coming Soon)</div>} />
        <Route path="/solver" element={<div>Solver Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;