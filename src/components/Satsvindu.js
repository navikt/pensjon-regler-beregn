import React from "react";

class Satsvindu extends React.Component{
    constructor(props){
        super(props)
        this.state = {currentTabell: 'ingen'}
    }
    render(){
        return(
            <h2>Tabell: {this.state.currentTabell}</h2>
        );
    }
}

export default Satsvindu