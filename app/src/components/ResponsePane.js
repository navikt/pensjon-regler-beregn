import React, {useEffect, useState} from "react";
import '../App.css';

function ResponsePane(props) {

    var url = 'https://pensjon-regler-t0.dev.adeo.no/api/'; //'https://example.com/profile'  //
    var servicetype= 'beregnOpptjening'
    var data = {
        "beholdningTom" : 1514804400000,
        "persongrunnlag" : {
            "penPerson" : {
                "penPersonId" : 25700806
            },
            "fodselsdato" : -486133200000,
            "flyktning" : false,
            "personDetaljListe" : [ "java.util.ArrayList", [ {
                "grunnlagsrolle" : {
                    "kode" : "SOKER",
                    "er_gyldig" : true
                },
                "rolleFomDato" : -483886800000,
                "tillegg" : false,
                "bruk" : true,
                "grunnlagKilde" : {
                    "kode" : "PEN",
                    "er_gyldig" : true
                }
            } ] ],
            "sisteGyldigeOpptjeningsAr" : 2019,
            "opptjeningsgrunnlagListe" : [ "java.util.ArrayList", [ {
                "ar" : 2011,
                "pi" : 781,
                "pia" : 0,
                "pp" : 0.0,
                "opptjeningType" : {
                    "kode" : "PPI",
                    "er_gyldig" : true
                },
                "maksUforegrad" : 0,
                "bruk" : true,
                "grunnlagKilde" : {
                    "kode" : "POPP",
                    "er_gyldig" : true
                },
                "opptjeningTypeListe" : [ "java.util.ArrayList", [ ] ]
            } ] ],
            "inntektsgrunnlagListe" : [ "java.util.ArrayList", [ ] ],
            "trygdetidPerioder" : [ "java.util.ArrayList", [ ] ],
            "trygdetidPerioderKapittel20" : [ "java.util.ArrayList", [ ] ],
            "afpHistorikkListe" : [ "java.util.ArrayList", [ ] ],
            "antallArUtland" : 0,
            "utenlandsoppholdListe" : [ "java.util.ArrayList", [ ] ],
            "forsteVirkningsdatoGrunnlagListe" : [ "java.util.ArrayList", [ ] ],
            "vernepliktAr" : [ ],
            "skiltesDelAvAvdodesTP" : -99,
            "instOpphReduksjonsperiodeListe" : [ "java.util.ArrayList", [ ] ],
            "instOpphFasteUtgifterperiodeListe" : [ "java.util.ArrayList", [ ] ],
            "dagpengegrunnlagListe" : [ "java.util.ArrayList", [ ] ],
            "omsorgsgrunnlagListe" : [ "java.util.ArrayList", [ ] ],
            "arbeidsforholdsgrunnlagListe" : [ "java.util.ArrayList", [ ] ],
            "arbeidsforholdEtterUforgrunnlagListe" : [ "java.util.ArrayList", [ ] ],
            "utbetalingsgradUTListe" : [ "java.util.ArrayList", [ ] ],
            "PREG_behandlesSomGift" : false,
            "PREG_P67" : false,
            "PREG_ektefellenMottarPensjon" : false,
            "PREG_poengtillegg" : 0.0,
            "PREG_boddEllerArbeidetIUtlandet" : false,
            "PREG_vilkarsvedtakEPSListe" : [ "java.util.ArrayList", [ ] ]
        },
        "beholdning" : {
            "ar" : 2017,
            "totalbelop" : 1187.5616578041836,
            "opptjening" : {
                "ar" : 2015,
                "opptjeningsgrunnlag" : 0.0,
                "anvendtOpptjeningsgrunnlag" : 0.0,
                "arligOpptjening" : 0.0,
                "lonnsvekstInformasjon" : {
                    "lonnsvekst" : 0.03429478672985797,
                    "reguleringsDato" : 1462096800000,
                    "uttaksgradVedRegulering" : 0
                },
                "pSatsOpptjening" : 18.1,
                "poengtall" : {
                    "pp" : 0.0,
                    "pia" : 0,
                    "pi" : 0,
                    "ar" : 0,
                    "bruktIBeregning" : false,
                    "gv" : 0,
                    "maksUforegrad" : 0,
                    "PREG_poengar" : false,
                    "PREG_poengarUtland" : false,
                    "PREG_pp_fa" : 0.0,
                    "PREG_pp_gradert" : 0.0,
                    "PREG_pp_omregnet" : 0.0,
                    "PREG_up_faktor" : 0.0,
                    "PREG_ysk_faktor" : 0.0,
                    "uforear" : false,
                    "PREG_avkortet" : false,
                    "PREG_omsorg" : false,
                    "PREG_omregnet" : false,
                    "PREG_ikkeProrata" : false,
                    "PREG_ikkeAlternativProrata" : false,
                    "PREG_brp" : 0.0,
                    "PREG_brp_fa" : 0.0,
                    "PREG_tilsvarerUforear" : false,
                    "PREG_effektivFPP" : 0.0,
                    "PREG_effektivPAA" : 0.0,
                    "merknadListe" : [ "java.util.ArrayList", [ ] ]
                },
                "inntektUtenDagpenger" : 0.0,
                "dagpenger" : 0.0,
                "dagpengerFiskerOgFangstmenn" : 0.0,
                "omsorg" : 0.0,
                "forstegangstjeneste" : 0.0,
                "arligOpptjeningOmsorg" : 0.0,
                "arligOpptjeningUtenOmsorg" : 0.0,
                "PREG_antFgtMnd" : 0.0,
                "PREG_samletDagpenger" : 0.0,
                "PREG_samletUtbetalteDagpenger" : 0.0,
                "PREG_samletFerietillegg" : 0.0,
                "PREG_samletBarnetillegg" : 0.0
            },
            "lonnsvekstInformasjon" : {
                "lonnsvekst" : 0.011400000000000077,
                "reguleringsDato" : 1493632800000,
                "uttaksgradVedRegulering" : 0
            },
            "reguleringsInformasjon" : {
                "lonnsvekst" : 0.011400000000000077,
                "fratrekksfaktor" : 0.0,
                "gammelG" : 0,
                "nyG" : 0,
                "reguleringsfaktor" : 1.0114,
                "gjennomsnittligUttaksgradSisteAr" : 0.0,
                "reguleringsbelop" : 13.38560697940261
            },
            "beholdningsType" : {
                "kode" : "PEN_B",
                "er_gyldig" : true
            },
            "merknadListe" : [ "java.util.ArrayList", [ ] ]
        }
    };

    const [result, setResult] = useState([]);




    useEffect(() => {
        fetch(url + servicetype, {
            // mode: 'no-cors',
            // 'Access-Control-Request-Method': '*',
            // 'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            method: 'POST', // or 'PUT'
            Origin: 'http://localhost:3000/',
            // dataType: 'json',
            // referrerPolicy: "no-referrer",
            headers:  {
                // 'Access-Control-Request-Method': '*',
                // 'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Content-Type': 'application/json',
                'accept': 'application/json',
                // 'mode': 'no-cors',
                // 'postman-token': '5bf211e3-8d3e-5eca-b303-dce815081ccd',
                // 'cache-control': 'no-cache',
                // 'Allow':'POST'
                Origin: 'http://localhost:3000/',
            },
            body: data, // JSON.parse(data), //JSON.stringify(data)  //// // data can be `string` or {object}!
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            // .then(response => console.log('Success:', response))
            .then(data => setResult(data));
    }, []);

    return(
        <div className = "ResponsePane">
            <h1>RESPONSE</h1>
            <p>response type: {servicetype}</p>
            <p>content : {result}</p>
        </div>
    )
}
export default ResponsePane