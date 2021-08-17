import React from "react";
import { Table } from "react-bootstrap";
import "../../App.css";

class BarnetilleggTak2016Tabell extends React.Component {
    constructor(props){
        super(props)
        this.state = {   
            currentTabell: this.props.currentTabell,
            valgtMiljø: this.props.valgtMiljø,      
            aktiv: this.props.aktiv,   
            error: null,
            isLoaded: false,
            verdier: [],
        }
    }
    componentDidMount() {
        fetch('https://pensjon-regler-'+this.props.valgtMiljø+'.dev.adeo.no/api/barnetilleggTak2016Sats?Aktiv='+this.props.aktiv+'&Satstabell='+this.props.currentTabell
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
              console.log("barnetilleggTak2016Sats lastet"));
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
                Barnetillegg Tak 2016
              </div>
              <Table striped bordered hover>
              <thead>   
                  <tr>
                      <th>FomDato</th>
                      <th>TomDato</th>
                      <th>Ordinær</th>
                      <th>Overgangsregler</th>
                  </tr>
              </thead> 
              <tbody> 
              {this.state.verdier.map((data,key) => {
                  return(
                          <tr>
                          <td>{data.satsFom[2]}-{data.satsFom[1]}-{data.satsFom[0]}</td>
                          <td>{data.satsTom[2]}-{data.satsTom[1]}-{data.satsTom[0]}</td>
                          <td>{data.kodeMap[1].ORDINÆR}</td>
                          <td>{data.kodeMap[1].OVERGANGSREGLER}</td>
                          </tr>
              )})}
              </tbody>
              </Table>
            </div>
        );
    }
}

export default BarnetilleggTak2016Tabell