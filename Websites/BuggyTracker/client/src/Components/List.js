//Imports
import '../App.css';
import React,{Component} from 'react';
import * as reactBootStrap from 'react-bootstrap';
import axios from 'axios';

//Main component
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: []
        }
    }

    //viewing, setting bugs
    componentDidMount() {
        axios.get('http://localhost:5000/bugs')
            .then(response => {
                if (response.data) {
                    console.log('did mount')
                this.setState({
                    bugs: response.data
              })
            }
        })
        .catch(error => {
            console.log(error)
        })
    };

    //delete
    deleteBug=(id) => {
        if (window.confirm("Are you sure you want do delete this item?")) {
            axios.delete(`http://localhost:5000/bugs/${id}`);
            window.location.reload();
        }
        else{
            window.alert("The bug was not deleted");
        }
    };

    //update bugs
    updateBug=(id) => {
        if (window.confirm("Are you sure you want do update this item?")) {
            if(window.confirm("Change Issue?")){
                const newIssue = prompt("Enter the new issue");
                axios.put(`http://localhost:5000/bugs/${id}`,{issue:newIssue});
            }
            if(window.confirm("Change Priority?")){
                const newPriority = prompt("Enter the new priority");
                axios.put(`http://localhost:5000/bugs/${id}`,{priority:newPriority});
            }
            if(window.confirm("Change Description?")){
                const newDescription = prompt("Enter the new description");
                axios.put(`http://localhost:5000/bugs/${id}`,{description:newDescription});
            }
            window.location.reload();
        }
            else{
            window.alert("The bug was not deleted");
        }
    };

    //rendering
    render() {
        const {bugs} = this.state;
        return (
            <div class="main">
                <reactBootStrap.ListGroup>
                    {bugs.map(({issue,priority,description,date,_id})=>(
                        <reactBootStrap.ListGroupItem key={_id.toString()} style={{backgroundColor:"#282c34", color:'whitesmoke'}}>
                            <reactBootStrap.Button
                                variant='danger'style={{marginLeft: '20px', float:'right'}}
                                onClick={()=>this.deleteBug(_id)}
                            >
                                Delete
                            </reactBootStrap.Button>
                            <reactBootStrap.Button style={{backgroundColor:"yellowGreen", borderColor: 'yellowGreen', float:'right'}}
                                onClick={()=>this.updateBug(_id)}>
                                Update
                            </reactBootStrap.Button>
                            <p>Issue: {issue} </p>
                            <p>Priority: {priority}</p> 
                            <p>Description: {description}</p>
                            <p>Date: {date}</p>
                        </reactBootStrap.ListGroupItem>
                    ))}
                </reactBootStrap.ListGroup>
            </div>
        );
    };
};


export default List;
