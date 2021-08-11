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
        }
    }
    componentDidMount() {
        fetch('    http://localhost:8080/api/uføretrygdMinsteytelseSats?Aktiv=false&Satstabell='+this.props.currentTabell
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
            <Table striped bordered hover>
            <thead>   
                <tr>Uføretrygd Minsteytelse</tr>
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
        );
    }
}

export default UføretrygdMinsteytelseTabell