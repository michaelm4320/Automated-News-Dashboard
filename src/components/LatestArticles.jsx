// src/components/LatestArticles.jsx
import React, { useEffect, useState } from 'react';

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/articles.json')
      .then(response => response.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <div>
      <h1>Latest Articles</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Time Ago</th>
            <th>Points</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{article.title}</td>
              <td>{article.timeAgo}</td>
              <td>{article.points}</td>
              <td>{article.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestArticles;
