import React, { useEffect, useState } from "react";

  export var ProdTabeller = []
  export var TestTabeller = []
  export var AndreTabeller = []
  export var AlleTabeller = []

  //Mye rot her, eksperimenter med å få informasjon fra API kall før rendering av komponenter i App

export function HentLister(){
    const [data,setData]=useState([]);  
    const getData=()=>{
        fetch('http://localhost:8080/alleSatstabeller'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            return response.json();
          })
          .then(function(myJson) {
            AlleTabeller = myJson[1]
            setData(myJson);
          });
      }
      useEffect(()=>{
        getData()
      },[])
      if(AndreTabeller.length == 0 && ProdTabeller.length == 0 && TestTabeller.length == 0){
        AlleTabeller.map((tabell) => {
          var navn = String(tabell)
          if(navn.startsWith("PROD_")){
             ProdTabeller.push(navn);
          } else if( navn.startsWith("SYSTEMTEST_") || navn.startsWith("TEST")){
            TestTabeller.push(navn);
          } else {
            AndreTabeller.push(navn);
          };
        });
      }

}

export function HentLister3() {
    console.log("men hva faen")
    var tabell = []
        fetch('http://localhost:8080/alleSatstabeller'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(res => res.json())
          .then((res) => { tabell = res[1] } )
          if(AndreTabeller.length == 0 && ProdTabeller.length == 0 && TestTabeller.length == 0){
            tabell.map((tabell) => {
                var navn = String(tabell)
                if(navn.startsWith("PROD_")){
                   ProdTabeller.push(navn);
                } else if( navn.startsWith("SYSTEMTEST_") || navn.startsWith("TEST")){
                  TestTabeller.push(navn);
                } else {
                  AndreTabeller.push(navn);
                };
              })
          }

}

export class HentLister2 extends React.Component {
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
                fetch('http://localhost:8080/alleSatstabeller'
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
                        prodTabeller: ProdTabeller,
                        testTabeller: TestTabeller,
                        andreTabeller: AndreTabeller  
                      },
                      console.log("tabell lastet"));
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
        console.log('render miljø', this.props, this.state);
        if (this.state.error) {
          return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
          return <div>Loading...</div>;
        } else if (ProdTabeller.length == 0 && TestTabeller.length == 0 && AndreTabeller.length == 0){
            return(
                this.state.tabeller.map((tabell) => {
                    var navn = String(tabell)
                    if(navn.startsWith("PROD_")){
                       ProdTabeller.push(navn);
                    } else if( navn.startsWith("SYSTEMTEST_") || navn.startsWith("TEST")){
                      TestTabeller.push(navn);
                    } else {
                      AndreTabeller.push(navn);
                    };
                  })
            )
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default HentLister2
