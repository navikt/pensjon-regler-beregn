import React from "react";
import { Table } from "react-bootstrap";

class UføretrygdMinsteytelseTabell extends React.Component {
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
        fetch('https://pensjon-regler-'+this.props.valgtMiljø+'.dev.adeo.no/api/uføretrygdMinsteytelseSats?Aktiv='+this.props.aktiv+'&Satstabell='+this.props.currentTabell
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
                    <th>Beregnes Som Gift</th>
                    <th>Ung Ufør</th>
                    <th>Forsørger Ektefelle over 60</th>
                    <th>Sats</th>
                    <th>Kode</th>
                    <th>Er Gyldig</th>
                    <th>Benyttet Ung Ufør</th>
                    <th>Oppfylt Ung Ufør</th>
                    <th>Eksportforbud Ung Ufør</th>
                </tr>
            </thead> 
            <tbody> 
            {this.state.verdier.map((data,key) => {    //beregnesSomGift og ungUfor ikke alltid til stede ????            
                return(

                        <tr>
                        <td>{data.satsFom[2]}-{data.satsFom[1]}-{data.satsFom[0]}</td>
                        <td>{data.satsTom[2]}-{data.satsTom[1]}-{data.satsTom[0]}</td>
                        <td></td>
                        <td></td>
                        <td>{data.forsorgerEktefelleOver60.toString()}</td>
                        <td>{data.satsMinsteytelse.sats}</td>
                        <td>{data.satsMinsteytelse.satsType.kode}</td>
                        <td>{data.satsMinsteytelse.satsType.er_gyldig.toString()}</td>
                        <td>{data.satsMinsteytelse.benyttetUngUfor.toString()}</td>
                        <td>{data.satsMinsteytelse.oppfyltUngUfor.toString()}</td>
                        <td>{data.satsMinsteytelse.eksportForbudUngUfor.toString()}</td>
                        </tr>
            )})}
             </tbody>
            </Table>
        </div>
      )
        return(
            <div>
              <div class = "sats-header" onClick = {this.handleClick}>
              Uføretrygd Minsteytelse
              </div>
              {this.state.show ? <TabellRender></TabellRender> : null}
            </div>
        );
    }
}

export default UføretrygdMinsteytelseTabell