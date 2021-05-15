//Code for the add form 
//imports
import React,{Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./../App.css";
import axios from 'axios';

//class for the form
class PFormi extends Component{
    constructor(props) {
        super(props);
        this.state = {
          eName:"",
          eMail:"",
          eVaccinated:"",
          eAge:"",
          eIncome:"",
          dataPoints:[]
        }
    };
    //getting the data
    componentDidMount() {
        axios.get('http://localhost:5000/people')
            .then(response => {
                if (response.data) {
                    console.log('did mount')
                this.setState({
                    dataPoints: response.data
              })
            }
        })
        .catch(error => {
            console.log(error)
        })
    };

    //setters to change values
    setName=(event)=>{
        this.setState({eName: event.target.value});
    };
    setMail=(event)=>{
        this.setState({eMail: event.target.value});
    };
    setVaccinated=(event)=>{
        this.setState({eVaccinated: event.target.value});
    };
    setAge=(event)=>{
        this.setState({eAge: event.target.value});
    };
    setIncome=(event)=>{
        this.setState({eIncome: event.target.value});
    };

    //make the update based on the id
    updatePerson=(names,mails,ids,eName,eMail,eAge,eIncome,eVaccinated) => {
        let dId = 0;
        for(let i = 0;i<names.length;i++)
        {
            if(eName===names[i] && eMail===mails[i])
                dId = ids[i];
        }
        if(eAge!=="")
            axios.put(`http://localhost:5000/people/${dId}`,{age: eAge});
        else
            console.log("no change")
        if(eIncome!=="")
            axios.put(`http://localhost:5000/people/${dId}`,{income: eIncome});  
        else
            console.log("no change")
        if(eVaccinated!=="")
            axios.put(`http://localhost:5000/people/${dId}`,{vaccinated: eVaccinated}); 
        else
            console.log("no change") 
        window.alert('Your data has been submitted');
    };



    //completing the add form
    render (){
       
        //parsing the data
        let ids = [];
        let names = [];
        let mails = [];

        this.state.dataPoints.map(({_id})=>(
            ids.push(_id)
        ))
        this.state.dataPoints.map(({name})=>(
            names.push(name)
        ))
        this.state.dataPoints.map(({mail})=>(
            mails.push(mail)
        ))

        return(
            <div className="mForm">
                <Form>
                    <Form.Row className="sForm">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control as="textarea" rows={1} value={this.state.eName} onChange={this.setName}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control as="textarea" rows={1} value={this.state.eMail} onChange={this.setMail} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="exampleForm.ControlTextarea5">
                        <Form.Label className="lForm">Vaccinated</Form.Label>
                        <Form.Label className="lForm" style={{fontWeight:'bold', fontStyle:'italic'}}>
                        To have your responses used in the data you must enter one of the keywords. (Yes, No, In Line, or Not Sure)
                        </Form.Label>
                        <Form.Control as="textarea" rows={1} value={this.state.eVaccinated} onChange={this.setVaccinated}/>
                    </Form.Group>
                    <div className="miForm">
                    <Form.Row>
                        <Form.Group controlId="exampleForm.ControlTextarea6">
                            <Form.Label>Age</Form.Label>
                            <Form.Control as="textarea" rows={1} value={this.state.age} onChange={this.setAge}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea7">
                            <Form.Label>Income</Form.Label>
                            <Form.Control as="textarea" value={this.state.income} rows={1} onChange={this.setIncome}/>
                        </Form.Group>
                    </Form.Row>
                    </div>
                    <Form.Row className="lForm">
                        <Button variant="primary" onClick={()=>this.updatePerson(
                            names,mails,ids,this.state.eName,
                            this.state.eMail,this.state.eAge,this.state.eIncome,
                            this.state.eVaccinated)}>
                        Submit
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    };
}

export default PFormi;
