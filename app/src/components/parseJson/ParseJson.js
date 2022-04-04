import {useState} from "react";


function parseJson(props) {
    const [uiData, setuiDate] = useState(props.data);
    var uiHtml=[]

    useEffect(() => {
        //console.log("load file1")
        const d = require('./jsonTestFile/trygdetid.json');
        setUiData(JSON.parse(JSON.stringify(d)).TabList.data.a)
        //console.log(d);
    }, []);

    var rootTab = []
    var tabs = []

    //https://stackoverflow.com/questions/45200938/recursively-parse-json-tree-in-javascript
    //create root tab
    for (var k in uiData) {
        if (uiData.hasOwnProperty(k)) {
            const name = uiData[k]['name']
            // console.log(name)
            const horizontalTab =<button className="tablinks" onClick={(e) => openTab(e, {name})}>{name}</button>
            rootTab.push(horizontalTab)

            let tabLevel = uiData[k]['data'] //['a']
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
    return uiHtml
}