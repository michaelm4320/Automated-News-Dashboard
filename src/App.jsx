// src/App.jsx
import React, { useState } from 'react';
import LatestArticles from './components/LatestArticles';
import './App.css';
import qaWolfLogo from './assets/qa_wolf_logo.jpg';

function App() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/articles');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  };

  return (
    <div>
      <img src={qaWolfLogo} className="logo" alt="QA Wolf Logo" />
      <h1>QA Wolf Dashboard</h1>
      <button onClick={fetchArticles}>Fetch Latest Articles</button>
      <LatestArticles articles={articles} />
    </div>
  );
}

export default App;
