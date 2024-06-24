const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Add this line

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS

app.get('/api/articles', (req, res) => {
  const filePath = path.join(__dirname, '../public/articles.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
