import logo from './satsviewer.png';
import './App.css';
import ReactDOM from 'react-dom';
import DropdownMenu from './components/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Miljølister';
import {      HentLister, HentLister2, HentLister3} from './components/Miljølister';
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
        valgtTabell: "ingen"
    }

    this.handleTabellChange = this.handleTabellChange.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:8080/alleSatstabeller' //TODO peker mot localhost inntil videre, for lokal utvikling
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
                console.log("prod push")
            } else if( navn.startsWith("SYSTEMTEST_") || navn.startsWith("TEST")){
              TestTabeller.push(navn);
              console.log("test push")
            } else {
              AndreTabeller.push(navn);
              console.log("andre push")
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
  handleTabellChange(event) {
    console.log('event target print:' + event.target)
    console.log('Valgt satstabell (inne i App.js): ' + this.state.valgtTabell);
  }
  render(){
    console.log("App render", this.state)
    const valgtTabell = this.state.valgtTabell;
    return (
      <div class = "App-header">          
        <h1> PENSJON REGLER SATSVIEWER </h1>
        <div class = "flexbox-container">
          <DropdownMenu href = {"ProdTabeller"} name = "PROD Tabeller" list = {ProdTabeller} onTabellChange = {this.handleTabellChange}>PROD Tabeller</DropdownMenu>
          <DropdownMenu href = {"TestTabeller"} name = "Test Tabeller" list = {TestTabeller} onTabellChange = {this.handleTabellChange}>Test Tabeller</DropdownMenu>
          <DropdownMenu href = {"AndreTabeller"} name = "Andre Tabeller" list = {AndreTabeller} onTabellChange = {this.handleTabellChange}>Andre Tabeller</DropdownMenu>
          <DropdownMenu href = {"MiljøTabeller"} name = "Aktiv Tabell i Miljø" list = {["Q1","Q2","Q3","Q4","T1","T2","T3","T4"]} onTabellChange = {this.handleTabellChange}>Aktiv Tabell i Miljø</DropdownMenu>
        </div>
        <div class = "satsvindu-container">
          <Satsvindu currentTabell = "PROD"></Satsvindu>
        </div>
      </div>
  );
    }
}
ReactDOM.render(App,document.getElementById('root'))
export default App;
