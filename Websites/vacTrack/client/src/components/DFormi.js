//Code for the add form 
//imports
import React,{Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./../App.css";
import axios from 'axios';

//class for the form
class DFormi extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataPoints: [],
            enteredName:"",
            enteredMail:""
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

    //set the values based on the user entry values
    setName=(event)=>{
        this.setState({enteredName: event.target.value});
    };

    setMail=(event)=>{
        this.setState({enteredMail: event.target.value});
    };

    //make the actual delete request
    deleteEntry=(names,mails,ids,eName,eMail) => {
        let dId = 0;
        for(let i = 0;i<names.length;i++)
        {
            if(eName===names[i] && eMail===mails[i])
                dId = ids[i];
        }
        if (window.confirm("Are you sure you want do delete this item?")) {
            axios.delete(`http://localhost:5000/people/${dId}`);
            window.location.reload();
        }
        else{
            window.alert("The entry was not deleted");
        }
    };
    //completing the delete form
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
                            <Form.Control as="textarea" rows={1} value={this.state.enteredName} onChange={this.setName}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control as="textarea" rows={1} value={this.state.enteredMail} onChange={this.setMail}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="lForm">
                        <Button variant="primary" onClick={()=>this.deleteEntry(
                            names,mails,ids,this.state.enteredName,this.state.enteredMail)}>
                        Submit
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    };
}

export default DFormi;
