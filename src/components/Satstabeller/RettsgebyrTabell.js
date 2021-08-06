import React from "react";
import { Table } from "react-bootstrap";

class RettsgebyrTabell extends React.Component {
    constructor(props){
        super(props)
        this.state = {   
            currentTabell: this.props.currentTabell,         
            error: null,
            isLoaded: false,
            verdier: [],
        }
    }
    componentDidMount() {
        fetch('    http://localhost:8080/api/rettsgebyrSats?Aktiv=false&Satstabell='+this.props.currentTabell
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
              console.log("Rettsgebyr lastet"));
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
            <Table striped bordered hover>
            <thead>   
                <tr>Rettsgebyr</tr>
                <tr>
                    <th>FomDato</th>
                    <th>TomDato</th>
                    <th>Rettsgebyr</th>
                    <th>TOL_GR_EO_ETTERBET</th>
                    <th>TOL_GR_EO_TILBAKEKR</th>
                    <th>TERSKEL_FEILUTBET</th>
                </tr>
            </thead> 
            <tbody> 
            {this.state.verdier.map((data,key) => {
                return(
                        <tr>
                        <td>{data.satsFom[2]}-{data.satsFom[1]}-{data.satsFom[0]}</td>
                        <td>{data.satsTom[2]}-{data.satsTom[1]}-{data.satsTom[0]}</td>
                        <td>{data.kodeMap[1].RETTSGEBYR}</td>
                        <td>{data.kodeMap[1].TOL_GR_EO_ETTERBET}</td>
                        <td>{data.kodeMap[1].TOL_GR_EO_TILBAKEKR}</td>
                        <td>{data.kodeMap[1].TERSKEL_FEILUTBET}</td>
                        </tr>
            )})}
             </tbody>
            </Table>
            </div>
        );
    }
}

export default RettsgebyrTabell