import { Dropdown } from "react-bootstrap";
import React from "react";
import { DropdownButton } from "react-bootstrap";

class DropdownMenu extends React.Component{
    constructor(props){
        super(props)
        this.state = {name: "", list: []}
    }
    componentDidMount(){
        this.setState( {name: this.props.name,list:this.props.list})
    }
    render(){
        console.log('render dropdown', this.props, this.state);
        return(

            <DropdownButton menuAlign = "left" id="dropdown-basic-button" size="lg" title={this.state.name}>
                {this.state.list.map((listItem)=>
                    <Dropdown.Item href ={'#/action-'+listItem} key = {listItem}>{listItem}</Dropdown.Item>
                )}
            </DropdownButton>
        );
    }
}

export default DropdownMenu