import React,{Component} from "react";
import "./../App.css";
import {Doughnut,Bar} from "react-chartjs-2";
import axios from 'axios'

class Charti extends Component{
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

    //functions for processing the data that is submitted 
    ageRounder(ages) {
        let x=Array(10).fill(0);
        for(let i = 0;i<ages.length;i++)
        {
            let z = Math.floor(ages[i]/10);
            x[z]++;
        }
        return x;
    }
    incomeProcessor(incomes) {
        let x=Array(10).fill(0);
        for(let i = 0;i<incomes.length;i++)
        {
            let z = Math.floor(incomes[i]/10000);
            if(z>9)
                z = 9;
            x[z]++;
        }
        return x;
    }
    vaccinatedProcessor(vacs){
        let x=Array(4).fill(0);
        for(let i = 0;i<vacs.length;i++)
        {
            if(vacs[i]==="Yes")
                x[0]++;
            else if(vacs[i]==="No")
                x[1]++;
            else if(vacs[i]==="In Line")
                x[2]++;
            else
                x[3]++;
        }
        return x;
    }

    vacByAge(vacs,ages){
        let [rows, cols] = [4, 10]; 
        let x = Array(rows).fill(0).map(()=>Array(cols).fill(0));
        for(let i = 0;i<vacs.length;i++)
        {
            let z = Math.floor(ages[i]/10);
            if(vacs[i]==="Yes")
                x[0][z]++;
            else if(vacs[i]==="No")
                x[1][z]++;
            else if(vacs[i]==="In Line")
                x[2][z]++;
            else
                x[3][z]++;
        }
        return x;
    }
    vacByInc(vacs,incomes){
        let [rows, cols] = [4, 10]; 
        let x = Array(rows).fill(0).map(()=>Array(cols).fill(0));
        for(let i = 0;i<vacs.length;i++)
        {
            let z = Math.floor(incomes[i]/10000);
            if(z>9)
                z = 9;
            if(vacs[i]==="Yes")
                x[0][z]++;
            else if(vacs[i]==="No")
                x[1][z]++;
            else if(vacs[i]==="In Line")
                x[2][z]++;
            else
                x[3][z]++;
        }
        return x;
    }
    //rendering the charts
    render (){
        const {dataPoints} = this.state;

        //parsing the data
        let rawAge = [];
        let rawIncome = [];
        let rawVaccinated = [];
        dataPoints.map(({age})=>(
            rawAge.push(age)
        ))
        dataPoints.map(({income})=>(
            rawIncome.push(income)
        ))
        dataPoints.map(({vaccinated})=>(
            rawVaccinated.push(vaccinated)
        ))
        //processed data 
        let processedAge = this.ageRounder(rawAge);
        let processedIncome = this.incomeProcessor(rawIncome);
        let processedVaccinated = this.vaccinatedProcessor(rawVaccinated);
        let ageVacData = this.vacByAge(rawVaccinated,rawAge);
        let incVacData = this.vacByInc(rawVaccinated,rawIncome);
        //render the charts
        return(
        <div>
            <div className="charts">
                <Doughnut 
                    height={450} width={450}
                    options={{maintainAspectRatio:false,
                        plugins:{
                            title: {
                                display:true,
                                text: "Whether respondants have been vaccinated"
                            }
                        }  
                    }}
                    data={{
                        labels:["vaccinated", "not vaccinated", "in line", "may get vaccinated"],
                        datasets: [
                        {
                            data:processedVaccinated,
                            backgroundColor: [
                                '#93b9f5',
                                '#6a9be9',
                                '#354154',
                                '#272e3b'
                            ]
                        }
                    ]
                }}/>
            </div>
            <div className="mForm">
                <div className="charts">
                    <Bar 
                        height={400} width={400}
                        options={{
                            maintainAspectRatio:false,
                            plugins:{
                                title: {
                                    display:true,
                                    text: "Whether respondants have been vaccinated (by age)"
                                }
                            },
                            responsive:true,
                            scales: {
                                x: {
                                stacked: true,
                                },
                                y: {
                                stacked: true
                                }
                            }  
                        }}
                        data={{
                            labels:["0-10", "11-20", "21-30", "31-40","41-50","51-60", "61-70","71-80", "81-90", "90+"],
                            datasets: [
                            {
                                label:"Vaccinated",
                                data:ageVacData[0],
                                backgroundColor: [
                                    '#93b9f5',
                                ]
                            },
                            {
                                label:'Not Vaccinated',
                                data:ageVacData[1],
                                backgroundColor: [
                                    '#6a9be9'
                                ]
                            },
                            {
                                label:"In Line",
                                data:ageVacData[2],
                                backgroundColor: [
                                    '#354154'
                                ]
                            },
                            {
                                label:'Not Sure',
                                data:ageVacData[3],
                                backgroundColor: [
                                    '#272e3b'
                                ]
                            }
                        ]
                    }}/>
                </div>
                <div className="charts">
                    <Bar 
                        height={400} width={400}
                        options={{
                            maintainAspectRatio:false,
                            plugins:{
                                title: {
                                    display:true,
                                    text: "Whether respondants have been vaccinated (by income in thousands)"
                                }
                            },
                            responsive:true,
                            scales: {
                                x: {
                                stacked: true,
                                },
                                y: {
                                stacked: true
                                }
                            }  
                        }}
                        data={{
                            labels:["0-10", "11-20", "21-30", "31-40","41-50","51-60", "61-70","71-80", "81-90", "90+"],
                            datasets: [
                            {
                                label:"Vaccinated",
                                data:incVacData[0],
                                backgroundColor: [
                                    '#93b9f5',
                                ]
                            },
                            {
                                label:'Not Vaccinated',
                                data:incVacData[1],
                                backgroundColor: [
                                    '#6a9be9'
                                ]
                            },
                            {
                                label:"In Line",
                                data:incVacData[2],
                                backgroundColor: [
                                    '#354154'
                                ]
                            },
                            {
                                label:'Not Sure',
                                data:incVacData[3],
                                backgroundColor: [
                                    '#272e3b'
                                ]
                            }
                        ]
                    }}/>
                </div>
            </div>
            <div className="mForm">
                <div className="charts">
                    <Doughnut 
                    height={400} width={400}
                    options={{maintainAspectRatio:false,
                        plugins:{
                            title: {
                                display:true,
                                text: "Age of respondants (years)"
                            }
                        }  
                    }}
                    data={{
                        labels:["0-10", "11-20", "21-30", "31-40","41-50","51-60", "61-70","71-80", "81-90", "90+"],
                        datasets: [
                            {
                                data:processedAge,
                                label:"hi",
                                backgroundColor: [
                                    '#b7cef1',
                                    '#93b9f5',
                                    '#70a8ff',
                                    '#6a9be9',
                                    '#6591d5',
                                    '#354154',
                                    '#2e3746',
                                    '#272e3b',
                                    '#21262f',
                                    '#1a1e24'
                                ]
                            }
                        ]
                    }}/>
                </div>
                <div className="charts">
                    <Doughnut 
                    height={400} width={400}
                    options={{maintainAspectRatio:false,
                        plugins:{
                            title: {
                                display:true,
                                text: "Income of respondants (thousands)"
                            }
                        }  
                    }}
                    data={{
                        labels:["0-10", "11-20", "21-30", "31-40","41-50","51-60", "61-70","71-80", "81-90", "90+"],
                        datasets: [
                            {
                                data:processedIncome,
                                backgroundColor: [
                                    '#b7cef1',
                                    '#93b9f5',
                                    '#70a8ff',
                                    '#6a9be9',
                                    '#6591d5',
                                    '#354154',
                                    '#2e3746',
                                    '#272e3b',
                                    '#21262f',
                                    '#1a1e24'
                                ]
                            }
                        ]
                    }}/>
                </div>
            </div>
        </div>
        );
    };
}

export default Charti;
//https://www.chartjs.org/docs/latest/samples/bar/stacked.html