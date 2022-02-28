import React, {useEffect, useState} from "react";
import '../App.css';
import './ResponsePane.css'
import {tab} from "@testing-library/user-event/dist/tab";

const  openTab = function (evt, tabName) {
    // let targe = evt.target()
    // console.log(targe)
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i<tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i<tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // console.log("click:" + JSON.stringify(tabName))
    document.getElementById(tabName.name).style.display = "block";
    evt.currentTarget.className += " active";
    //return undefined;
}

function ResponsePane(props) {


    const [result, setResult] = useState([]);
    const [uiData, setUiData] = useState([]);
    let [uiHtml, setUiHtml] = useState([]);




    useEffect(() => {
        //console.log("load file1")
        const d = require('./jsonTestFile/trygdetid.json');
        setUiData(JSON.parse(JSON.stringify(d)).TabList.data.a)
        //console.log(d);
    }, []);

    function parseJson() {
        var rootTab = []
        var tabs = []
        //create root tab
            for (var k in uiData) {
              if (uiData.hasOwnProperty(k)) {
                  const name = uiData[k]['name']
                  console.log(name)
                     //const Element = "button" +  ' className="tablinks"' + ' onClick=\"openTab(event, \'' + name + "')\""
                    // const horizontalTab =<button className="tablinks" onClick={this.openTab.bind(this, {name})}>{name}</button>
                  const horizontalTab =<button className="tablinks" onClick={(e) => openTab(e, {name})}>{name}</button>
                  //const horizontalTab =<Element>{name}</Element>
                  rootTab.push(horizontalTab)

                  const secondLevel = uiData[k]['data']['a']
                  const tabname = uiData[k]['name']

                  for(var j in secondLevel) {
                      //console.log("tab or subList level:" + JSON.stringify(secondLevel[j]))
                        //create TabContent (subtabList or  tables)
                      const typeValue = secondLevel[j]['type']
                      var eachTab = []
                      if (typeValue == 'TABLIST') {
                          //TODO loop all the subTab

                          //put in tabList
                          //formatHtml =<div className="tab">formatHtml</div>
                      }
                      else if(typeValue == "TABLE") {
                          var t = []

                          //header
                          var rows = secondLevel[j]['header']
                          var cells = []
                          for(var k in rows) {
                              const cell = <th>{rows[k]['data']}</th>  //FIXME
                              cells.push(cell)
                          }
                          const header = <tr>{cells}</tr>
                          t.push(header)

                          //data
                          rows = secondLevel[j]['data']['List']
                          cells = []
                          for(var k in rows) {
                              //TODO cell can have popup dialog.
                              const cell = <td>{rows['data']}</td>
                              cells.push(cell)
                          }
                          const onerow = <tr>{cells}</tr>
                          t.push(onerow)

                          //create a table
                          t = <table>{t}</table>
                          eachTab.push(t)
                      }
                      eachTab = <div id={tabname} className="tabcontent">{eachTab}</div>  //sub level , need wrap to equal
                  }
                  tabs.push(eachTab)  //use level , use push to merge.
              }
           }


        //wrap tabs with tabList
        rootTab = <div className="tab">{rootTab}</div>
        uiHtml = <div>{rootTab}{tabs}</div>
        return uiHtml
    }


    // use this recursive function with a parse funciton
    function parseObjectProperties(obj, parse) {
        for (var k in obj) {
            if (typeof obj[k] === 'object' && obj[k] !== null) {
                parseObjectProperties(obj[k], parse)
            } else if (obj.hasOwnProperty(k)) {
                parse(k, obj[k], obj)
            }
        }
    }


// then apply to the property the task you want, in this case just console
    const replace = "replaceTextString"

    function createHtml(k, prop, obj) {
        if (k == 'type') {
            if (prop == 'TABLIST') {
                console.log(k + ': ' + prop)
                const tabList = <div className="tab"></div>
                uiHtml = tabList
            } else if (prop == 'TAB') {
                console.log(k + ': ' + prop)
                //<button class="tablinks" onclick="openCity(event, 'London')" id="defaultOpen">London</button>
                const name = obj['name']
                const horizontalTab = <button className="tablinks" onClick="openTab(event,{name})">{name}</button>
                uiHtml = uiHtml.toString().replace(replace, horizontalTab + replace)
                //document.getElementById("demo").innerHTML =  uiHtml
            } else if (prop == 'Table') {

            }
        }

    }

    parseObjectProperties(uiData, function (k, prop, obj) {
        //createHtml(k,prop,obj)
        createblock(k, prop, obj)
    })

    function createblock(type, prop, obj) {
        switch (type) {
            // case "TABLIST":
            //     const Element = "h" + data.level;
            //     return <Element>{data.text}</Element>;
            case "TAB":
                const name = obj['name']
                const horizontalTab = "<button className=\"tablinks\" onClick=\"openTab(event, '" + name + "')\">" + name + "</button>"
                return horizontalTab;
            case "Table":


            // default:
            //     console.log("Unknown block type", type);
            //     return null;
        }
    }

    const blocks = {
        time: 1602725895949,
        blocks: [
            {
                type: "header",
                data: {
                    text: "This is a heading",
                    level: 2
                }
            },
            {
                type: "paragraph",
                data: {
                    text: "This is a paragraph"
                }
            }
        ]
    };

    function Block(block) {
        const type = block.type
        const name = block.name
        const data = block.data
        switch (type) {
            // case "header":
            //     const Element = "h" + data.level;
            //     return <Element>{data.text}</Element>;
            // case "paragraph":
            //     return <p>{data.text}</p>;
            case "TABLIST":
                const tabList = <div class="tab"></div>
                return tabList;
            case "TAB":
                const horizontalTab = <button className="tablinks" onClick="openTab(event,{name})">{name}</button>
                return horizontalTab;
            case "Table":

                    }
        }

    return (
        <div className="ResponsePane">
            <h1>RESPONSE</h1>
            {/*<p>response type: {servicetype}</p>*/}
            {/*<p>response result: {result.xml}</p>*/}
            <p id="demo"></p>
            {parseJson()}
            {/*<div className="tab">
                <button className="tablinks" onClick="openTab(event, 'Oversikt')">Oversikt</button>
                <button className="tablinks" onClick="openTab(event, 'GenerellHistorikk')">GenerellHistorikk</button>
                <button className="tablinks" onClick="openTab(event, 'Pensjonsbeholdning')">Pensjonsbeholdning</button>
                <button className="tablinks" onClick="openTab(event, 'Uføre')">Uføre</button>
                <button className="tablinks" onClick="openTab(event, 'AFP Historikk')">AFP Historikk</button>
                <button className="tablinks" onClick="openTab(event, 'Opptjeningsgrunnlag')">Opptjeningsgrunnlag
                </button>
                <button className="tablinks" onClick="openTab(event, 'Inntektsgrunnlag')">Inntektsgrunnlag</button>
                <button className="tablinks" onClick="openTab(event, 'Trygdetid kap 19')">Trygdetid kap 19</button>
                <button className="tablinks" onClick="openTab(event, 'Trygdetid kap 20')">Trygdetid kap 20</button>
                <button className="tablinks" onClick="openTab(event, 'Trygdetid Alternativ')">Trygdetid Alternativ
                </button>
                <button className="tablinks" onClick="openTab(event, 'Trygdeavtale')">Trygdeavtale</button>
                <button className="tablinks" onClick="openTab(event, 'Institusjon')">Institusjon</button>
                <button className="tablinks"
                        onClick="openTab(event, 'InngangOgEksportgrunnlag')">InngangOgEksportgrunnlag
                </button>
                replaceTextString
            </div>*/}
            {/*
            <div className="App">
                <h1>JSON to html below</h1>
                {blocks.blocks.map((block, i) => (
                    <Block key={i} {...block} />
                ))}
            </div>*/}
            {/*<div>
                <h1>JSON to html below</h1>
                {console.log(uiData.TabList.data.a[0])}

                {
                    uiData.map((block, i) => (
                        <Block key={i} {...block} />
                    ))}
            </div>*/}
        </div>
    )
}

export default ResponsePane