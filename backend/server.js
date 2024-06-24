const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3001;

app.use(cors());

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

app.post('/api/fetch-articles', (req, res) => {
  // Adjust the path to correctly reference the index.js file
  const scriptPath = path.resolve(__dirname, '../index.js');

  console.log(scriptPath); // Add this line to log the script path

  exec(`node "${scriptPath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing script: ${stderr}`);
      res.status(500).send('Error running Playwright script');
      return;
    }
    console.log(stdout);
    res.status(200).send('Articles fetched successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
