//imports
import React,{Component} from "react";
import Button from 'react-bootstrap/Button';
import "./../App.css";
import AFormi from './AFormi.js';
import DFormi from './DFormi.js';
import PFormi from './PFormi.js';
//class for the form
class MainForm extends Component{
    constructor(props) {
        super(props);
        this.showForm= this.showForm.bind(this);
        this.state = {pickForm: 0}
    };
    
    showForm(x){
        switch(x){
            case 1:
                this.setState({pickForm: 1});
                break;
            case 2:
                this.setState({pickForm:2});
                break;
            case 3:
                this.setState({pickForm:3});
                break;
            default:
                this.setState({pickForm:0})
        }
    };


    //completing the update, make, and delete form
    render (){
        const pickedForm = this.state.pickForm;
        return(
            <div>
                <div className='mForm'>
                    <Button variant="primary" className="buttons" onClick={()=>this.showForm(1)}>
                        Make an Entry
                    </Button>
                    <Button variant="primary" className="buttons" onClick={()=>this.showForm(2)}>
                        Update an existing entry
                    </Button>
                    <Button variant="primary" className="buttons" onClick={()=>this.showForm(3)}>
                        Delete an entry
                    </Button>
                </div>
                <div>
                    {pickedForm===1 && <AFormi/>}
                    {pickedForm===2 && <PFormi/>}      
                    {pickedForm===3 && <DFormi/>}
                </div>
            </div>
        );
    };
}

export default MainForm;
