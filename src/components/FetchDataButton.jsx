// FetchDataButton.jsx
import React from 'react';
import PropTypes from 'prop-types';

FetchDataButton.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const FetchDataButton = ({ fetchData }) => {
  const handleFetchData = () => {
    fetchData(); // Call the fetchData function passed from the parent component
  };

  return (
    <button onClick={handleFetchData}>
      Fetch Data
    </button>
  );
};

export default FetchDataButton;
