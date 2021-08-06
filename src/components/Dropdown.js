import { Dropdown } from "react-bootstrap";
import React from "react";
import { DropdownButton } from "react-bootstrap";

class DropdownMenu extends React.Component{
    constructor(props){
        super(props)
        this.state = {name: this.props.name, list: this.props.list, value: "default"}

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

  handleSubmit(event) {
    this.setState({value: event.target.name});
    this.props.onTabellChange(event.target.name);
    console.log(event.target.name);
    console.log('Valgt satstabell: ' + this.state.value);
  }
    render(){
        console.log('render dropdown state value:'+ this.state.value);
        return(

            <DropdownButton menuAlign = "left" id="dropdown-basic-button" size="lg" title={this.state.name}>
                {this.state.list.map((listItem)=>
                    <Dropdown.Item href ={'#/action-'+listItem} key = {listItem} name = {listItem} onClick = {this.handleSubmit}>{listItem}</Dropdown.Item>
                )}
            </DropdownButton>
        );
    }
}

export default DropdownMenu