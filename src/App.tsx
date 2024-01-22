import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
    <h1> Hello world</h1>
    <FetchButton/>
  </div>
  );
}

// Button component :
function FetchButton() {
  return (
    <button>
      Fetch data
    </button>
  );
}

export default App;
