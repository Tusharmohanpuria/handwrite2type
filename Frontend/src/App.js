import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/common/NavigationBar';
import Home from './pages/Home';
import TextConversion from './pages/TextConversion';
import NoPage from './pages/NoPage';
import FontGenerator from './components/font/FontGenerator';
import DashboardPage from './dashboard/DashboardPage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text-conversion" element={<TextConversion />} />
        <Route path="/font-generator" element={<FontGenerator />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

