import React from "react";
import { Table } from "react-bootstrap";

class VeietGrunnbeløpTabell extends React.Component {
    constructor(props){
        super(props)
        this.state = {      
            error: null,
            isLoaded: false,
            verdier: []
        }
    }
    componentDidMount() {
        fetch('https://pensjon-regler-'+this.props.valgtMiljø+'.dev.adeo.no/api/veietGrunnbeløpSats?Aktiv='+this.props.aktiv+'&Satstabell='+this.props.currentTabell
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
              console.log("VeietGrunnbeløp lastet"));
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )

      }
    render(){
        return(
            <div>
              <div class = "sats-header">
                Veiet Grunnbeløp
              </div>
            <Table striped bordered hover>
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
            </Table>
            </div>
        );
    }
}

export default VeietGrunnbeløpTabell