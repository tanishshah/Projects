import React,{Component} from "react";
import {MapContainer,Marker,TileLayer,Popup} from "react-leaflet";
import "./../App.css";
import axios from 'axios'

class Mapi extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataPoints: []
        }
    }

    //getting the data from the database
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

    //rendering the map
    render (){
        const {dataPoints} = this.state;
        return(
            <div className="mForm">
                <MapContainer center={[50.451191, -104.616623]} zoom={3} minZoom={3} maxZoom={18} scrollWheelZoom={false} style={{width:"750px",height:"750px"}}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {dataPoints.map(({longitude,lattitude,_id,vaccinated,name})=>(
                        <Marker key={_id} position={[lattitude,longitude]}>
                            <Popup>
                            <p>Vaccinated: {vaccinated}</p>
                            <p>Name: {name}</p>
                            </Popup>
                        </Marker>
                    ))}
                    
                </MapContainer>
            </div>
        );
    };
}

export default Mapi;
