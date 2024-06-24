import React, { useState } from 'react';
import LatestArticles from './components/LatestArticles';
import './App.css';
import qaWolfLogo from './assets/qa_wolf_logo.png';


function App() {
  return (
    <div>
      <img src={qaWolfLogo} alt="QA Wolf Logo" className="logo" style={{ height: '9em', width: 'auto' }} />
      <LatestArticles />
    </div>
  )
}

export default App
