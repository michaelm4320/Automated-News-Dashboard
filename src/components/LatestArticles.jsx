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
            <th className="center">#</th>
            <th className="center">Title</th>
            <th className="center">Time Ago</th>
            <th className="center">Points</th>
            <th className="center">Comments</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Display the row number */}
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
