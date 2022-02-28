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
    //console.log("click:" + JSON.stringify(tabName))
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
                  // console.log(name)
                  const horizontalTab =<button className="tablinks" onClick={(e) => openTab(e, {name})}>{name}</button>
                  rootTab.push(horizontalTab)

                  const secondLevel = uiData[k]['data']['a']
                  const tabname = uiData[k]['name']
                  var eachTab = []
                  for(var j in secondLevel) {
                      //console.log("tab or subList level:" + JSON.stringify(secondLevel[j]))
                        //create TabContent (subtabList or  tables)
                      const typeValue = secondLevel[j]['type']
                      const orientation = secondLevel[j]['orientation']

                      if (typeValue == 'TABLIST') {
                          //TODO loop all the subTab

                          //put in tabList
                          //formatHtml =<div className="tab">formatHtml</div>
                      }
                      else if(typeValue == "TABLE") {
                          var t = []
                          let tableName = ''
                          if(secondLevel[j].hasOwnProperty('name')) {
                              tableName =secondLevel[j]['name']
                              eachTab.push(<h3>{tableName}</h3>)
                          }
                          if(orientation=='VERTICAL') {
                              const headers = secondLevel[j]['header'];
                              //console.log( secondLevel[j]['data'] )
                              const data = secondLevel[j]['data']['entry']['list'];
                              for(var i in headers) {
                                  var r = []
                                  const header = <th>{headers[i]['data']}</th>
                                  //suppose just one cell for test
                                  // console.log( data[i]['data'])
                                  const cell = <td>{data[i]['data']}</td>
                                  r.push(header)
                                  r.push(cell)
                                  t.push(<tr>{r}</tr>)
                              }
                          }
                          else if(orientation=='HORIZONTAL'){
                              //header
                              const headers = secondLevel[j]['header'];
                              var header = []
                              for(var i in headers) {
                                  const cell = <th>{headers[i]['data']}</th>
                                  header.push(cell)
                              }
                              t.push(<tr>{header}</tr>)

                              //data
                              var r = []
                              let data = []
                              //console.log(secondLevel[j]['data'])
                              if(secondLevel[j]['data'].hasOwnProperty('entry')) {
                                if(secondLevel[j]['data']['entry'].hasOwnProperty('list')) {
                                      data = secondLevel[j]['data']['entry']['list'];
                                    for(var i in data) {
                                        //TODO cell can have popup dialog.
                                        const cell = <td>{data[i]['data']}</td>
                                        r.push(cell)
                                    }
                                    t.push(<tr>{r}</tr>)
                                  }
                              }else   {
                                  data = secondLevel[j]['data'];
                                  for(var i in data) {
                                      for(var x in data[i]) {
                                          // console.log("x: " + x)
                                          if(x =='list') {
                                              for(var c in data[i]['list']) {
                                                  console.log(data[i]['list'][c]['data'])
                                                  //TODO cell can have popup dialog.
                                                  const cell = <td>{data[i]['list'][c]['data']}</td>
                                                  r.push(cell)
                                              }
                                              t.push(<tr>{r}</tr>)
                                          }
                                      }
                                  }
                              }

                          }
                          //create a table
                          // t = <table><tbody>{t}</tbody></table>
                          eachTab.push(<table><tbody>{t}</tbody></table>)
                      }
                      //eachTab = <div id={tabname} className="tabcontent">{eachTab}</div>  //sub level , need wrap to equal
                      tabs.push(<div id={tabname} className="tabcontent">{eachTab}</div>)  //same level , use push to merge.
                  }
                  eachTab= []
              }
           }


        //wrap tabs with tabList
        rootTab = <div className="tab">{rootTab}</div>
        uiHtml = <div>{rootTab}{tabs}</div>
        return uiHtml
    }


//     // use this recursive function with a parse funciton
//     function parseObjectProperties(obj, parse) {
//         for (var k in obj) {
//             if (typeof obj[k] === 'object' && obj[k] !== null) {
//                 parseObjectProperties(obj[k], parse)
//             } else if (obj.hasOwnProperty(k)) {
//                 parse(k, obj[k], obj)
//             }
//         }
//     }
//
//
// // then apply to the property the task you want, in this case just console
//     const replace = "replaceTextString"
//
//     function createHtml(k, prop, obj) {
//         if (k == 'type') {
//             if (prop == 'TABLIST') {
//                 console.log(k + ': ' + prop)
//                 const tabList = <div className="tab"></div>
//                 uiHtml = tabList
//             } else if (prop == 'TAB') {
//                 console.log(k + ': ' + prop)
//                 //<button class="tablinks" onclick="openCity(event, 'London')" id="defaultOpen">London</button>
//                 const name = obj['name']
//                 const horizontalTab = <button className="tablinks" onClick="openTab(event,{name})">{name}</button>
//                 uiHtml = uiHtml.toString().replace(replace, horizontalTab + replace)
//                 //document.getElementById("demo").innerHTML =  uiHtml
//             } else if (prop == 'Table') {
//
//             }
//         }
//
//     }

    // parseObjectProperties(uiData, function (k, prop, obj) {
    //     //createHtml(k,prop,obj)
    //     createblock(k, prop, obj)
    // })
    //
    // function createblock(type, prop, obj) {
    //     switch (type) {
    //         // case "TABLIST":
    //         //     const Element = "h" + data.level;
    //         //     return <Element>{data.text}</Element>;
    //         case "TAB":
    //             const name = obj['name']
    //             const horizontalTab = "<button className=\"tablinks\" onClick=\"openTab(event, '" + name + "')\">" + name + "</button>"
    //             return horizontalTab;
    //         case "Table":
    //
    //
    //         // default:
    //         //     console.log("Unknown block type", type);
    //         //     return null;
    //     }
    // }

    // const blocks = {
    //     time: 1602725895949,
    //     blocks: [
    //         {
    //             type: "header",
    //             data: {
    //                 text: "This is a heading",
    //                 level: 2
    //             }
    //         },
    //         {
    //             type: "paragraph",
    //             data: {
    //                 text: "This is a paragraph"
    //             }
    //         }
    //     ]
    // };
    //
    // function Block(block) {
    //     const type = block.type
    //     const name = block.name
    //     const data = block.data
    //     switch (type) {
    //         // case "header":
    //         //     const Element = "h" + data.level;
    //         //     return <Element>{data.text}</Element>;
    //         // case "paragraph":
    //         //     return <p>{data.text}</p>;
    //         case "TABLIST":
    //             const tabList = <div class="tab"></div>
    //             return tabList;
    //         case "TAB":
    //             const horizontalTab = <button className="tablinks" onClick="openTab(event,{name})">{name}</button>
    //             return horizontalTab;
    //         case "Table":
    //
    //                 }
    //     }

    return (
        <div className="ResponsePane">
            <h1>RESPONSE</h1>
            {/*<p>response type: {servicetype}</p>*/}
            {/*<p>response result: {result.xml}</p>*/}
            <p id="demo"></p>
            {parseJson()}

        </div>
    )
}

export default ResponsePane