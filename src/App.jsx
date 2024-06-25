import React, { useState } from 'react';
import LatestArticles from './components/LatestArticles';
import './App.css';
import qaWolfLogo from './assets/qa_wolf_logo.png';

function App() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      // Trigger the Playwright script to update the JSON file
      await fetch('http://localhost:3001/api/fetch-articles', {
        method: 'POST',
      });

      // Fetch the updated articles from the JSON file
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
      <h1>Latest News Articles</h1>
      <button onClick={fetchArticles}>Fetch Latest Articles</button>
      <LatestArticles articles={articles} />
    </div>
  );
}

export default App;
