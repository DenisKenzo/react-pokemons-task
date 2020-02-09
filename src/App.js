import React from 'react';
import './App.scss';
import Home from './components/home/home.jsx'
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
