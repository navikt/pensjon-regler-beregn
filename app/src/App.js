import logo from './satsviewer.png';
import './App.css';
import ReactDOM from 'react-dom';
import DropdownMenu from './components/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import  Satsvindu  from './components/Satsvindu';

export var ProdTabeller = []
export var TestTabeller = []
export var AndreTabeller = []

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        error: null,
        isLoaded: false,
        tabeller: [],
        andreTabeller: [],
        prodTabeller: [],
        testTabeller: [],
        valgtTabell: 'PROD',
        valgtMiljø: 'Q4',
        aktiv: 'false'
    }

    this.handleTabellChange = this.handleTabellChange.bind(this);
    this.handleMiljøChange = this.handleMiljøChange.bind(this);
  }
  componentDidMount() {
    fetch('https://pensjon-regler-q4.dev.adeo.no/alleSatstabeller'
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
          tabeller: result[1],
        },
        console.log("tabell lastet"));
        {
          this.state.tabeller.map((tabell) => {
            var navn = String(tabell)
            if(navn.startsWith("PROD")){
                ProdTabeller.push(navn);
            } else if( navn.startsWith("SYSTEMTEST_") || navn.startsWith("TEST")){
              TestTabeller.push(navn);
            } else {
              AndreTabeller.push(navn);
            };
          })
        }
        this.setState({
          prodTabeller: ProdTabeller,
          testTabeller: TestTabeller,
          andreTabeller: AndreTabeller 
        })
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
    ) //TODO vil helst ha dette i en egen metode
  }
  
  handleTabellChange(name) {
    this.setState({valgtTabell: name, valgtMiljø: 'Q4', aktiv: 'false'})
  }

  handleMiljøChange(name) {
    this.setState({valgtMiljø: name, aktiv: 'true'})
  }

  render(){
    return (
      <div class = "App-header">   
    
        <h1>   PENSJON REGLER SATSVIEWER </h1>
        <div>{<img src={logo} alt="Logo" width="500" height="300"/>}      </div>
        <div class = "menu-container">
          <DropdownMenu href = {"ProdTabeller"} name = "PROD Tabeller" list = {ProdTabeller} prevTabell = {this.state.valgtTabell} onTabellChange = {this.handleTabellChange}>PROD Tabeller</DropdownMenu>
          <DropdownMenu href = {"TestTabeller"} name = "Test Tabeller" list = {TestTabeller} prevTabell = {this.state.valgtTabell} onTabellChange = {this.handleTabellChange}>Test Tabeller</DropdownMenu>
          <DropdownMenu href = {"AndreTabeller"} name = "Andre Tabeller" list = {AndreTabeller} prevTabell = {this.state.valgtTabell} onTabellChange = {this.handleTabellChange}>Andre Tabeller</DropdownMenu>
          <DropdownMenu href = {"MiljøTabeller"} name = "Aktiv Tabell i Miljø" list = {["Q1","Q2","Q3","Q4","T1","T2","T3","T4"]} onTabellChange = {this.handleMiljøChange}>Aktiv Tabell i Miljø</DropdownMenu>
        </div>
        <div class = "satsvindu-container">
          <Satsvindu currentTabell = {this.state.valgtTabell} valgtMiljø = {this.state.valgtMiljø} aktiv = {this.state.aktiv}></Satsvindu>
        </div>
        <div class = "App-footer" height = "500"></div>
      </div>
  );
    }
}
ReactDOM.render(App,document.getElementById('root'))
export default App;
