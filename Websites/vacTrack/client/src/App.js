//imports
import React from 'react';
import './App.css';
import Navi from './components/Navi.js';
import Mapi from './components/Mapi.js';
import Formi from './components/Formi.js';
import Charti from './components/Charti.js';
//main function
function App() {
  return (
    <div className="App">
    <Navi/>
    <Mapi/>
    <Charti/>
    <Formi/>
    </div>
  );
}

export default App;
