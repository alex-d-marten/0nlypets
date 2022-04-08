import React, {useState} from 'react';
import './App.css';
// component import
import Header from './components/Header';
import Footer from './components/Footer';
import logo from "./logo.svg";


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
      <section className='main-section'>

        {/* Put all pages in between this section tag */}

      </section>
      <Footer></Footer>
    </div>
  );
}

export default App;
