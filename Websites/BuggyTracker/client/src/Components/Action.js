//Tanish Shah
//Imports
import React,{Component} from 'react';
import '../App.css';
import * as reactBootStrap from 'react-bootstrap';
import axios from 'axios';

//Main class
class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue:"",
      priority:"",
      description:""
    }
  };

  //setters for the states
  setIssue=(event)=>{
    this.setState({issue: event.target.value});
  };
  setPriority=(event)=>{
    this.setState({priority: event.target.value});
  };
  setDescription=(event)=>{
    this.setState({description: event.target.value});
  };

  //post request when submit pressed
  createBug=()=>{
    const {issue, priority, description } = this.state;
    const bug = {issue,priority,description};

    axios.post('http://localhost:5000/bugs',bug)
        .then(res => {
        window.alert('Bug created')
        this.setState({
            issue: '',
            priority: '',
            description:''
        })
    })
  };
  
  //render function
  render(){
    const {issue, priority, description} = this.state;
    return (
      <div className="main">
          <h1 className="titleText">Make a bug</h1>
          <div className="form">
            <reactBootStrap.Form>
              <reactBootStrap.Form.Group controlId="exampleForm.ControlInput1">
                  <reactBootStrap.Form.Label className="formText">Issue</reactBootStrap.Form.Label>
                  <reactBootStrap.Form.Control as="textarea" rows={1} value={issue} onChange={this.setIssue}/>
              </reactBootStrap.Form.Group>
              <reactBootStrap.Form.Group controlId="exampleForm.ControlSelect1">
                <reactBootStrap.Form.Label className="formText">Priority</reactBootStrap.Form.Label>
                <reactBootStrap.Form.Control as="select" value={priority} onChange={this.setPriority}>
                  <option>Set Priority</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </reactBootStrap.Form.Control>
                </reactBootStrap.Form.Group>
                <reactBootStrap.Form.Group controlId="exampleForm.ControlTextarea1">
                  <reactBootStrap.Form.Label className="formText">Description</reactBootStrap.Form.Label>
                  <reactBootStrap.Form.Control as="textarea" rows={3} value={description} onChange={this.setDescription} />
                </reactBootStrap.Form.Group>
            </reactBootStrap.Form>
          </div>
          <reactBootStrap.Button 
            style={{backgroundColor:"yellowGreen", borderColor: 'yellowGreen', display:'flex', marginLeft:'auto', marginRight:'auto', marginTop:'2vh'}}
            onClick={this.createBug}>
            Submit
          </reactBootStrap.Button>
      </div>
    )
  }
};

export default Action;
