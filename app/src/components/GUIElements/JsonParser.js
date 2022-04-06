import React, {useEffect, useState} from "react";
import {openSideTab, openTab} from "./Tab";

const search = (current, target, parent) => {

    // if (parent != undefined && parent.hasOwnProperty(target)) {
    //     console.log("find it --" + target)
    //     console.log(parent[target])
    //     return JSON.stringify(parent[target]);
    // }
    // if(current == undefined || current == '' /*|| parent == 'java.util.ArrayList'*/) {
    //     return 'end'
    // }
    
    for (var child in current) {
        console.log("child:" + child)
        // console.log("child value:" + JSON.stringify(current[child]))
        // console.log("current object has type value:" + current[child].hasOwnProperty('type'))
        // console.log("current object has type value:" + current[child].hasOwnProperty('position'))
        // console.log("child value:" + JSON.parse(current[child]))

        // find TOP ,then data, then recursive , last is type....  In the   model of backend.. move type to the beginning.
        //one level can only has recursive when child = data.
        if(current[child].hasOwnProperty('type')) {
            console.log("type: "  +  current[child]['type'])
            if(  current[child]['type'] == 'TABLIST') {
                //DO parse tabList
                //parseTabList(name, current['data'], parent)
                //continue parse
                search( current[child]['data'], target, current[child]);
            }
            else if( current[child]['type'] == 'TAB') {
                //DO parse Tab
                //parseTab(name, current['data'], parent)
                //continue parse
                search( current[child]['data'], target, current[child]);
            }
            else if( current[child]['type']== 'TABLE') {
                //TODO parse Table frame, also include cells??

                search( current[child]['cells'], target, current[child]);
            }

        }
        else if(current[child].hasOwnProperty('popover')) {
            console.log("Cell level - one cell: "  +  current[child]['data'])
            //TODO parse one cell property

            if(current[child]['popover']==true) {
                search( current[child]['popoverContent'], target, current[child]);
            }
        }
        else if(Array.isArray(current[child])) {
            console.log('has arrays, probably just one ')
            search( current[child], target, current);
        }
    }
  }

function JsonParser(props){
            let [data] = useState(props.data)
            console.log(data)
            // data =  JSON.parse(JSON.stringify(data))
            // console.log(data)
            const[uiHtml, setuiHtml] = []
            var rootTab = []
            var tabs = []
            return (
                <p>{search(data, 'xyzzt', [])}</p>
            );

            //create root tab
                /*for (var k in data) {
                  if (data.hasOwnProperty(k)) {
                      const name = data[k]['name']
                      const horizontalTab =<button className="tablinks" onClick={(e) => openTab(e, {name})}>{name}</button>
                      rootTab.push(horizontalTab)
    
                      let tabLevel = data[k]['data'] //['a']
                      // for(var j in tabLevel) {
    
    
                          //console.log("tab or subList level:" + JSON.stringify(secondLevel[j]))
                            //create TabContent (subtabList or  tables)
    
                        var eachTab= []
                          if (tabLevel.hasOwnProperty("TabList")) {
                              //tabLevel = tabLevel['data']
                              for(var j in tabLevel)  {
                                  var sideTabs = []
                                  //console.log(tabLevel[j]['data']['a'])
                                  const subTabs = tabLevel[j]['data']['a']
                                  for(var i in subTabs) {
                                      const sideTabName = subTabs[i]['name']
                                      const sideTab =<button className="sideTablinks" onClick={(e) => openSideTab(e, {sideTabName})}>{sideTabName}</button>
                                      //TODO loop for inside of sideTab
    
                                      sideTabs.push(<div id={name} className="sideTabcontent">{sideTab}</div>)
                                  }
                                  //put subTabList in another tab
                                  eachTab.push(<div className="sideTab">{sideTabs}</div>)
                              }
    
                          }
                          else if(tabLevel.hasOwnProperty('a') ) {  //Table
                              tabLevel = tabLevel['a']
                              for(var j in tabLevel ) {
                                  const typeValue = tabLevel[j]['type']
                                  const orientation = tabLevel[j]['orientation']
                                  var t = []
                                  let tableName = ''
                                  if(tabLevel[j].hasOwnProperty('name')) {
                                      tableName =tabLevel[j]['name']
                                      eachTab.push(<h3>{tableName}</h3>)
                                  }
                                  if(orientation=='VERTICAL') {
                                      const headers = tabLevel[j]['header'];
                                      //console.log( secondLevel[j]['data'] )
                                      const data = tabLevel[j]['data']['entry']['list'];
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
                                      const headers = tabLevel[j]['header'];
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
                                      if(tabLevel[j]['data'].hasOwnProperty('entry')) {
                                          if(tabLevel[j]['data']['entry'].hasOwnProperty('list')) {
                                              data = tabLevel[j]['data']['entry'] //['list'];
    
                                              for(var i in data) {
                                                  r= []
                                                  if(i=='list') {
                                                      for(var x in data['list']) {
                                                          //console.log(data[i][x])
                                                          const cell = <td>{data[i][x]['data']}</td>
                                                          r.push(cell)
                                                      }
                                                      t.push(<tr>{r}</tr>)
                                                  }
                                              }
    
                                              // for(var i in data) {
                                              //     //TODO cell can have popup dialog.
                                              //     const cell = <td>{data[i]['data']}</td>
                                              //     r.push(cell)
                                              // }
    
                                          }
                                      }else   {
                                          data = tabLevel[j]['data'];
                                          for(var i in data) {
                                              for(var x in data[i]) {
                                                  // console.log("x: " + x)
                                                  r= []
                                                  if(x =='list') {
                                                      for(var c in data[i]['list']) {
                                                          //console.log(data[i]['list'][c]['data'])
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
    
                          }
                          //eachTab = <div id={tabname} className="tabcontent">{eachTab}</div>  //sub level , need wrap to equal
                          tabs.push(<div id={name} className="tabcontent">{eachTab}</div>)  //same level , use push to merge.
                      // }
                      eachTab= []
                  }
               }
    
    
            //wrap tabs with tabList
            rootTab = <div className="tab">{rootTab}</div>
            uiHtml = <div>{rootTab}{tabs}</div>
            console.log(uiHtml)
            return uiHtml*/
        }

        export default JsonParser
