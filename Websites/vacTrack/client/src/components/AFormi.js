//Code for the add form 
//imports
import React,{Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./../App.css";
import axios from 'axios';

//class for the form
class AFormi extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name:"",
          mail:"",
          vaccinated:"",
          age:"",
          income:"",
          longitude:"",
          lattitude:""
        }
      };
    
      //setters
      setName=(event)=>{
        this.setState({name: event.target.value});
      };
      setMail=(event)=>{
        this.setState({mail: event.target.value});
      };
      setVaccinated=(event)=>{
        this.setState({vaccinated: event.target.value});
      };
      setLattitude=(event)=>{
        this.setState({lattitude: event.target.value});
      };
      setLongitude=(event)=>{
        this.setState({longitude: event.target.value});
      };
      setAge=(event)=>{
        this.setState({age: event.target.value});
      };
      setIncome=(event)=>{
        this.setState({income: event.target.value});
      };

      //post request when submit pressed
      createPerson=()=>{
        const {lattitude, longitude, name,mail,age,income,vaccinated} = this.state;
        const person = {lattitude, longitude, name,mail,age,income,vaccinated}; 
    
        axios.post('http://localhost:5000/people',person)
            .then(res => {
            window.alert('Your data has been submitted');
            this.setState({
                name: '',
                mail: '',
                age:'',
                income:'',
                longitude:'',
                lattitude:'',
                vaccinated:''
            })
            window.location.reload();
        })
      };



    //completing the add form
    render (){
        const {lattitude, longitude, name,mail,age,income,vaccinated} = this.state;
        return(
            <div className="mForm">
                <Form>
                <Form.Label style={{fontWeight:'bold', fontStyle:'italic', color:'red'}}>Required</Form.Label>
                    <Form.Row className="sForm">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control as="textarea" rows={1} value={name} onChange={this.setName}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control as="textarea" rows={1} value={mail} onChange={this.setMail} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea3">
                            <Form.Label>Lattitude</Form.Label>
                            <Form.Control as="textarea" rows={1} value={lattitude} onChange={this.setLattitude}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea4">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control as="textarea" rows={1} value={longitude} onChange={this.setLongitude}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="exampleForm.ControlTextArea7">
                        <Form.Label className="lForm">Vaccinated</Form.Label>
                        <Form.Label className="lForm" style={{fontWeight:'bold', fontStyle:'italic'}}>
                        To have your responses used in the data you must enter one of the keywords. (Yes, No, In Line, or Not Sure)
                        </Form.Label>
                        <Form.Control as="textarea" rows={1} value={vaccinated} onChange={this.setVaccinated}/>
                    </Form.Group>
                    <Form.Label style={{fontWeight:'bold', fontStyle:'italic'}}>Optional</Form.Label>
                    <div className="miForm">
                    <Form.Row>
                        <Form.Group controlId="exampleForm.ControlTextarea5">
                            <Form.Label>Age</Form.Label>
                            <Form.Control as="textarea" rows={1} value={age} onChange={this.setAge}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea6">
                            <Form.Label>Income</Form.Label>
                            <Form.Control as="textarea" value={income} rows={1} onChange={this.setIncome}/>
                        </Form.Group>
                    </Form.Row>
                    </div>
                    <Form.Row className="lForm">
                        <Button variant="primary" onClick={this.createPerson}>
                        Submit
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    };
}

export default AFormi;
