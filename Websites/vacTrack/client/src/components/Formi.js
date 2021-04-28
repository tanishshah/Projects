//imports
import React,{Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./../App.css";
import axios from 'axios'

//class for the form
class Formi extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name:"",
          mail:"",
          vaccinated:"",
          age:"",
          income:""
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
            window.alert('Your data has been submitted')
            this.setState({
                name: '',
                mail: '',
                age:'',
                income:'',
                longitude:'',
                lattitude:'',
                vaccinated:''
            })
        })
      };



    //completing the update, make, and delete form
    render (){
        const {lattitude, longitude, name,mail,age,income,vaccinated} = this.state;
        return(
            <div className="mForm">
                <Form>
                <Form.Label>Required</Form.Label>
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
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label className="lForm">Vaccinated</Form.Label>
                        <Form.Control as="select" value={vaccinated} onChange={this.setVaccinated}>
                            <option>Select an option</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>In Line</option>
                            <option>Not Sure</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Label>Optional</Form.Label>
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

export default Formi;
