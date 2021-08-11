import React from "react";
import { Table } from "react-bootstrap";

class NordiskKonvensjonslandTabell extends React.Component {
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
        fetch('    http://localhost:8080/api/nordiskKonvensjonsLandSats?Aktiv=false&Satstabell='+this.props.currentTabell
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
              console.log("Nordisk Konvensjonsland lastet"));
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
                <tr>Nordisk Konvensjonsland</tr>
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

export default NordiskKonvensjonslandTabell