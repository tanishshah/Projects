//imports
import React from 'react';
import './App.css';
import Navi from './components/Navi.js';
import Mapi from './components/Mapi.js';
import Charti from './components/Charti.js';
import MainForm from './components/MainForm.js';

//main function
function App() {
  return (
    <div className="App">
    <Navi/>
    <Mapi/>
    <Charti/>
    <MainForm/>
    </div>
  );
}

export default App;
