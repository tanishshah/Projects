import './App.css';
import Navi from './Components/Navi.js';
import Action from './Components/Action.js';
import Home from './Components/Home.js';
import React,{Component} from 'react';
import List from './Components/List.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component{
  render(){
    return (
      <div>
        <Router>
            <Navi/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/Action" exact component={Action}/>
              <Route path="/List" exact component={List}/>
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
