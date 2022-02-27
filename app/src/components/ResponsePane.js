import React, {useEffect, useState} from "react";
import '../App.css';
import './ResponsePane.css'
import {tab} from "@testing-library/user-event/dist/tab";

function ResponsePane(props) {

    var url = 'https://pensjon-regler-q5.dev.adeo.no/api'; //https://pensjon-regler-t0.dev.adeo.no';
    var servicetype = '/beregnOpptjening'
    var data = {
        "beholdningTom": 1514804400000,
        "persongrunnlag": {
            "penPerson": {
                "penPersonId": 25700806
            },
            "fodselsdato": -486133200000,
            "flyktning": false,
            "personDetaljListe": ["java.util.ArrayList", [{
                "grunnlagsrolle": {
                    "kode": "SOKER",
                    "er_gyldig": true
                },
                "rolleFomDato": -483886800000,
                "tillegg": false,
                "bruk": true,
                "grunnlagKilde": {
                    "kode": "PEN",
                    "er_gyldig": true
                }
            }]],
            "sisteGyldigeOpptjeningsAr": 2019,
            "opptjeningsgrunnlagListe": ["java.util.ArrayList", [{
                "ar": 2011,
                "pi": 781,
                "pia": 0,
                "pp": 0.0,
                "opptjeningType": {
                    "kode": "PPI",
                    "er_gyldig": true
                },
                "maksUforegrad": 0,
                "bruk": true,
                "grunnlagKilde": {
                    "kode": "POPP",
                    "er_gyldig": true
                },
                "opptjeningTypeListe": ["java.util.ArrayList", []]
            }]],
            "inntektsgrunnlagListe": ["java.util.ArrayList", []],
            "trygdetidPerioder": ["java.util.ArrayList", []],
            "trygdetidPerioderKapittel20": ["java.util.ArrayList", []],
            "afpHistorikkListe": ["java.util.ArrayList", []],
            "antallArUtland": 0,
            "utenlandsoppholdListe": ["java.util.ArrayList", []],
            "forsteVirkningsdatoGrunnlagListe": ["java.util.ArrayList", []],
            "vernepliktAr": [],
            "skiltesDelAvAvdodesTP": -99,
            "instOpphReduksjonsperiodeListe": ["java.util.ArrayList", []],
            "instOpphFasteUtgifterperiodeListe": ["java.util.ArrayList", []],
            "dagpengegrunnlagListe": ["java.util.ArrayList", []],
            "omsorgsgrunnlagListe": ["java.util.ArrayList", []],
            "arbeidsforholdsgrunnlagListe": ["java.util.ArrayList", []],
            "arbeidsforholdEtterUforgrunnlagListe": ["java.util.ArrayList", []],
            "utbetalingsgradUTListe": ["java.util.ArrayList", []],
            "PREG_behandlesSomGift": false,
            "PREG_P67": false,
            "PREG_ektefellenMottarPensjon": false,
            "PREG_poengtillegg": 0.0,
            "PREG_boddEllerArbeidetIUtlandet": false,
            "PREG_vilkarsvedtakEPSListe": ["java.util.ArrayList", []]
        },
        "beholdning": {
            "ar": 2017,
            "totalbelop": 1187.5616578041836,
            "opptjening": {
                "ar": 2015,
                "opptjeningsgrunnlag": 0.0,
                "anvendtOpptjeningsgrunnlag": 0.0,
                "arligOpptjening": 0.0,
                "lonnsvekstInformasjon": {
                    "lonnsvekst": 0.03429478672985797,
                    "reguleringsDato": 1462096800000,
                    "uttaksgradVedRegulering": 0
                },
                "pSatsOpptjening": 18.1,
                "poengtall": {
                    "pp": 0.0,
                    "pia": 0,
                    "pi": 0,
                    "ar": 0,
                    "bruktIBeregning": false,
                    "gv": 0,
                    "maksUforegrad": 0,
                    "PREG_poengar": false,
                    "PREG_poengarUtland": false,
                    "PREG_pp_fa": 0.0,
                    "PREG_pp_gradert": 0.0,
                    "PREG_pp_omregnet": 0.0,
                    "PREG_up_faktor": 0.0,
                    "PREG_ysk_faktor": 0.0,
                    "uforear": false,
                    "PREG_avkortet": false,
                    "PREG_omsorg": false,
                    "PREG_omregnet": false,
                    "PREG_ikkeProrata": false,
                    "PREG_ikkeAlternativProrata": false,
                    "PREG_brp": 0.0,
                    "PREG_brp_fa": 0.0,
                    "PREG_tilsvarerUforear": false,
                    "PREG_effektivFPP": 0.0,
                    "PREG_effektivPAA": 0.0,
                    "merknadListe": ["java.util.ArrayList", []]
                },
                "inntektUtenDagpenger": 0.0,
                "dagpenger": 0.0,
                "dagpengerFiskerOgFangstmenn": 0.0,
                "omsorg": 0.0,
                "forstegangstjeneste": 0.0,
                "arligOpptjeningOmsorg": 0.0,
                "arligOpptjeningUtenOmsorg": 0.0,
                "PREG_antFgtMnd": 0.0,
                "PREG_samletDagpenger": 0.0,
                "PREG_samletUtbetalteDagpenger": 0.0,
                "PREG_samletFerietillegg": 0.0,
                "PREG_samletBarnetillegg": 0.0
            },
            "lonnsvekstInformasjon": {
                "lonnsvekst": 0.011400000000000077,
                "reguleringsDato": 1493632800000,
                "uttaksgradVedRegulering": 0
            },
            "reguleringsInformasjon": {
                "lonnsvekst": 0.011400000000000077,
                "fratrekksfaktor": 0.0,
                "gammelG": 0,
                "nyG": 0,
                "reguleringsfaktor": 1.0114,
                "gjennomsnittligUttaksgradSisteAr": 0.0,
                "reguleringsbelop": 13.38560697940261
            },
            "beholdningsType": {
                "kode": "PEN_B",
                "er_gyldig": true
            },
            "merknadListe": ["java.util.ArrayList", []]
        }
    };

    const [result, setResult] = useState([]);
    const [uiData, setUiData] = useState([]);
    let [uiHtml, setUiHtml] = useState([]);


    useEffect(() => {
        //console.log("load file1")
        const d = require('./jsonTestFile/trygdetid.json');
        setUiData(JSON.parse(JSON.stringify(d)).TabList.data.a)
        //console.log(d);
    }, []);

    // useEffect(() => {
    //     fetch(url + servicetype, {
    //          // mode: 'no-cors',
    //         // crossDomain:true,
    //         // 'Access-Control-Request-Method': '*',
    //         // 'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    //         // 'Access-Control-Allow-Origin': '*',
    //         // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    //         method: 'POST', // or 'PUT'
    //         // Origin: 'http://localhost:3000/',
    //         // dataType: 'json',
    //         // referrerPolicy: "no-referrer",
    //         headers:  {
    //             // 'Access-Control-Request-Method': '*',
    //             // 'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    //             // 'Access-Control-Allow-Origin': '*',
    //             // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    //             'Content-Type':  'application/json', //'text/plain;charset=UTF-8' , //'application/json',
    //             'accept': 'application/json', //'application/json',
    //             // 'mode': 'no-cors',
    //             // 'postman-token': '5bf211e3-8d3e-5eca-b303-dce815081ccd',
    //             // 'cache-control': 'no-cache',
    //             // 'Allow':'POST'
    //             // Origin: 'http://localhost:3000/',
    //         },
    //         body: JSON.stringify(data), // JSON.parse(data), //JSON.stringify(data)  //// // data can be `string` or {object}!
    //         })
    //         .catch(error => console.error('Error:', error))
    //         .then(response => response.json())
    //         .then(data => setResult(data));
    // }, []);

    function parseJson() {
        var rootTab = []
        var tabs = []
        //create root tab
            for (var k in uiData) {
              if (uiData.hasOwnProperty(k)) {
                  const name = uiData[k]['name']
                     //const Element = "button" +  ' className="tablinks"' + ' onClick=\"openTab(event, \'' + name + "')\""
                     const horizontalTab =<button className="tablinks" onClick="openTab(event, \'{name}\')">{name}</button>
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
            case "TABLIST":
                const Element = "h" + data.level;
                return <Element>{data.text}</Element>;
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