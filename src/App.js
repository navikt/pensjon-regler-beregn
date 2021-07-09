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
    }
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
            if(navn.startsWith("PROD_")){
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
  render(){
    console.log("App render", this.state)
    return (
      <div class = "App-header">          
        <h1> PENSJON REGLER SATSVIEWER </h1>
        <div class = "flexbox-container">
          <DropdownMenu href = {"ProdTabeller"} name = "PROD Tabeller" list = {ProdTabeller}>PROD Tabeller</DropdownMenu>
          <DropdownMenu href = {"TestTabeller"} name = "Test Tabeller" list = {TestTabeller}>Test Tabeller</DropdownMenu>
          <DropdownMenu href = {"AndreTabeller"} name = "Andre Tabeller" list = {AndreTabeller}>Andre Tabeller</DropdownMenu>
          <DropdownMenu href = {"MiljøTabeller"} name = "Aktiv Tabell i Miljø" list = {["Q1","Q2","Q3","Q4","T1","T2","T3","T4"]}>Aktiv Tabell i Miljø</DropdownMenu>
        </div>
        <div>
          <Satsvindu currentTabell = {ProdTabeller}></Satsvindu>
        </div>
      </div>
  );
    }
}
ReactDOM.render(App,document.getElementById('root'))
export default App;
