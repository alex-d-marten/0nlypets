import React, {useState} from 'react';
import './App.css';
// component import
import Header from './components/Header';

function App() {
  // keeps track of which link in the Nav has been clicked
  // and is currently active.
  const [currentPage, setCurrentPage] = useState('Start');

  return (
    <div>
      <Header
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      ></Header>
    </div>
  );
}

export default App;
