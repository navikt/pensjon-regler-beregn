import React from "react";
import { Table } from "react-bootstrap";

class GarantiPensjonsnivåTabell extends React.Component {
    constructor(props){
        super(props)
        this.state = {   
            currentTabell: this.props.currentTabell,         
            error: null,
            isLoaded: false,
            verdier: [],
            show: true
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        fetch('https://pensjon-regler-'+this.props.valgtMiljø+'.dev.adeo.no/api/garantiPensjonsNivåSats?Aktiv='+this.props.aktiv+'&Satstabell='+this.props.currentTabell
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
              console.log("GarantiPensjonsNivå lastet"));
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
      const TabellRender = () => (
        <div>
          <Table striped bordered hover>
            <thead>   
                <tr>
                    <th>FomDato</th>
                    <th>TomDato</th>
                    <th>GPN Ordinær</th>
                    <th>GPN Høy</th>
                </tr>
            </thead> 
            <tbody> 
            {this.state.verdier.map((data,key) => {
                return(
                        <tr>
                        <td>{data.satsFom[2]}-{data.satsFom[1]}-{data.satsFom[0]}</td>
                        <td>{data.satsTom[2]}-{data.satsTom[1]}-{data.satsTom[0]}</td>
                        <td>{data.kodeMap[1].GPN_ORDINAER}</td>
                        <td>{data.kodeMap[1].GPN_HOY}</td>
                        </tr>
            )})}
             </tbody>
            </Table>
        </div>
      )
        return(
            <div>
              <div class = "sats-header" onClick = {this.handleClick}>
              Garantipensjonsnivå
              </div>
              {this.state.show ? <TabellRender></TabellRender> : null}
            </div>
        );
    }
}

export default GarantiPensjonsnivåTabell