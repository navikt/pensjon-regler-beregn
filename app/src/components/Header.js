import React from "react";
import "@navikt/ds-css";
import '../App.css';
import HeaderButton from "./Small/HeaderButton";

class Header extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
<div className="Header">
                <div className="HeaderTitle">Beregn Pensjon</div>
                <HeaderButton text = {"Åpne"}></HeaderButton>
                <HeaderButton text = {"Sats"}></HeaderButton>
                <HeaderButton text = {"Run"}></HeaderButton>
        </div>
        )
    }  
}
export default Header