import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes , Route, BrowserRouter} from 'react-router-dom'
import HomePage from './page/HomePage';
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route  path='/' element= {< HomePage />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
