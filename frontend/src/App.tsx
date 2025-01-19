import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/HomeScreen';
import ForeignerPage from './components/ForeignerPage';
import QRScanner from './components/QRScanner';
import ChatAgent from './components/ChatAgent';

function App() {
  return (
    <Router>
      <div className="fixed inset-0 bg-gray-900 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/user" element={<ForeignerPage />} />
          <Route path="/scan-qr" element={<QRScanner />} />
          <Route path="/chat-agent" element={<ChatAgent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;