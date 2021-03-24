//Imports
import React,{Component} from 'react';
import '../App.css';
import bl from './Images/bugLogo.png';

//Home Page
class Home extends Component {
  render(){
    return (
      <div className="main">
        <h1 className="titleText">Welcome to Buggy! A quick and simple way to track bugs!</h1>
        <p className="regText">To start make a start working on your bugs navigate to the actions button at the top of the page.</p>
        <img src={bl} alt="Icon of a bug" className="mainImg"/>
      </div>
    );
  }
}

export default Home;
