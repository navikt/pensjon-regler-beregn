import React from "react";
import '../App.css';

class RequestPane extends React.Component {

    _isMounted = false;

    constructor(props){
        super(props)
        this.state = {  
            id: this.props.id,
            request: [],
            isLoaded: false
        }
    }
    //Uses ID from URL to make a call to logviewer API to get request/metadata. Not working yet
    componentDidMount() {
        this._isMounted = true;
        if(this.state.id != null){
        fetch('https://pensjon-preg-logviewer-api.dev-fss.nais.io/api/log/'+this.state.id
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(res => res.json())
          .then(
            (result) => {
                if(this._isMounted){
              this.setState({
                isLoaded: true,
                request: result
              })
            }
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
        }
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

       render(){
        return(
          <div className ="RequestPane">
            <h1>REQUEST</h1>
            <div>request id: {this.state.id}</div>
            <div>{this.state.request.xml}</div>
          </div>
        )
      }
}
export default RequestPane