import React from "react";
import "@navikt/ds-css";
import '../App.css';

class Header extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
<div className="Header">
                <div className="HeaderTitle">Beregn Pensjon</div>
        </div>
        )
    }  
}
export default Header