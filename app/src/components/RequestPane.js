import React from "react";
import '../App.css';

class RequestPane extends React.Component {

    _isMounted = false;

    constructor(props){
        super(props)
        this.state = {  
            id: this.props.id,
            request: null,
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
           },
           mode: 'no-cors'
        }
        )
          .then(res => res.json())
          .then(
            (result) => {
                if(this._isMounted){
              this.setState({
                isLoaded: true,
                request: result[1]
              })
            }
            },
            (error) => {
              this.setState({
                isLoaded: false,
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
           if(this.state.isLoaded){
        {this.state.verdier.map((data,key) => {
            return(
                <div>
                    {data.environment}
                </div>
            )})}
        }
            console.log("ID: "+ this.state.id);
            console.log("isLoaded: "+ this.state.isLoaded);
        return(

            <div class ="RequestPane">
                <h1>REQUEST</h1>
                request id: {this.state.id}
            </div>
        )
      }
}
export default RequestPane