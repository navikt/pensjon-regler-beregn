import React from "react";
import { Table } from "react-bootstrap";
import  Satsheader  from "../Satsheader";

class GrunnpensjonTabell extends React.Component {
        constructor(props){
            super(props)
            this.state = {   
                currentTabell: this.props.currentTabell,         
                error: null,
                isLoaded: false,
                verdier: [],
                show: false
            }
            this.handleClick = this.handleClick.bind(this);
        }
        componentDidMount() {
            fetch('https://pensjon-regler-'+this.props.valgtMiljø+'.dev.adeo.no/api/grunnpensjonSats?Aktiv='+this.props.aktiv+'&Satstabell='+this.props.currentTabell
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
                  this.setState({
                    isLoaded: true,
                    verdier: result[1]
                  },
                  console.log("grunnpensjonSats lastet"));
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )
    
          }
          handleClick(event){
            this.setState({show: !this.state.show})
          }
        render(){
          const TabellRender = () => (<div><Table striped bordered hover>
            <thead>   
                <tr>
                    <th>FomDato</th>
                    <th>TomDato</th>
                    <th>Verdi</th>
                </tr>
            </thead> 
            <tbody> 
            {this.state.verdier.map((data,key) => {
                return(
                        <tr>
                        <td>{data.satsFom[2]}-{data.satsFom[1]}-{data.satsFom[0]}</td>
                        <td>{data.satsTom[2]}-{data.satsTom[1]}-{data.satsTom[0]}</td>
                        <td>{data.value}</td>
                        </tr>
            )})}
             </tbody>
            </Table></div>)
            return(
                <div>
              <div onClick = {this.handleClick}>
                <Satsheader headline = "Grunnpensjon" show = {this.state.show}></Satsheader>
              </div>
                  {this.state.show ? <TabellRender></TabellRender> : null}
                </div>
            );
        }
    }

export default GrunnpensjonTabell