import React from "react";
import { Table } from "react-bootstrap";
import SkjermingstilleggTabell from "./Satstabeller/SkjermingstilleggTabell";

class Satsvindu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentTabell: this.props.currentTabell,            
            error: null,
            isLoaded: false,
            verdier: []
        }
    }
    render(){
        return(
            <div>
            <h1>Valgt Tabell: {this.state.currentTabell}</h1>
                    <SkjermingstilleggTabell currentTabell = {this.state.currentTabell}></SkjermingstilleggTabell>
            </div>
        );
    }
}

export default Satsvindu