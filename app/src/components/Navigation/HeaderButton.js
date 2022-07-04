import React from "react";
import "@navikt/ds-css";
import "../../App.css";

class HeaderButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: this.props.text
        }
    }

    render() {
        return (
            <div className="HeaderButton">{this.props.text}</div>
        )
    }
}

export default HeaderButton