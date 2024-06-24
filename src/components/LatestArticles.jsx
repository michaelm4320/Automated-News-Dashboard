import React, { useState } from 'react';
import './LatestArticles.css'; // Import the CSS file

const LatestArticles = ({ articles }) => {
  return (
    <div className="table-wrapper">
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
            <tr key={index}> {/* Assign a unique key prop */}
              <td>{index + 1}</td>
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
