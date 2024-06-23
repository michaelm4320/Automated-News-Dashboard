<<<<<<< HEAD
=======
import React, { useState } from 'react';
>>>>>>> 5bd8563bb0bdc8db69c0764dd92874efaaafe725
import LatestArticles from './components/LatestArticles';
import FetchDataButton from './components/FetchDataButton'; // Import the FetchDataButton component
import './App.css';

function App() {
<<<<<<< HEAD
  return (
    <div>
      <h1>QA Wolf Dashboard</h1>
      <LatestArticles />
    </div>
  )
}

export default App
=======
  const [data, setData] = useState([]); // State to hold fetched data

  const fetchData = async () => {
    try {
      // Make an API call to fetch data from JSONPlaceholder (replace with actual URL)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const jsonData = await response.json();
      setData(jsonData); // Update the data state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div>
      <h1>QA Wolf Dashboard</h1>
      <FetchDataButton fetchData={fetchData} /> {/* Render the FetchDataButton component */}
      <LatestArticles data={data} /> {/* Pass the fetched data to LatestArticles component */}
    </div>
  );
}

export default App;
>>>>>>> 5bd8563bb0bdc8db69c0764dd92874efaaafe725
