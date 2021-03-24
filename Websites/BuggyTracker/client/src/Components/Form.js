import React from 'react';
import * as reactBootStrap from 'react-bootstrap';
import '../App.css';
function Form() {
  return (
    <div className="form">
        <reactBootStrap.Form>
            <reactBootStrap.Form.Group controlId="exampleForm.ControlInput1">
                <reactBootStrap.Form.Label className="formText">Issue</reactBootStrap.Form.Label>
                <reactBootStrap.Form.Control as="textarea" rows={1} />
            </reactBootStrap.Form.Group>
            <reactBootStrap.Form.Group controlId="exampleForm.ControlSelect1">
                <reactBootStrap.Form.Label className="formText">Priority</reactBootStrap.Form.Label>
                <reactBootStrap.Form.Control as="select">
                    <option>0</option>
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
                <reactBootStrap.Form.Control as="textarea" rows={3} />
            </reactBootStrap.Form.Group>
        </reactBootStrap.Form>
    </div>
  );
}

export default Form;
