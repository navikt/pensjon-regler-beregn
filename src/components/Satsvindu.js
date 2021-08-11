import React from "react";
import { Table } from "react-bootstrap";
import SkjermingstilleggTabell from "./Satstabeller/SkjermingstilleggTabell";
import VeietGrunnbeløpTabell from "./Satstabeller/VeietGrunnbeløpTabell";
import UføretrygdMinsteytelseTabell from "./Satstabeller/UføretrygdMinsteytelseTabell";
import SærtilleggTabell from "./Satstabeller/SærtilleggTabell";
import RettsgebyrTabell from "./Satstabeller/RettsgebyrTabell";
import ReguleringsfaktorTabell from "./Satstabeller/ReguleringsfaktorTabell";
import NordiskKonvensjonslandTabell from "./Satstabeller/NordiskKonvensjonslandTabell";
import MinstePensjonsnivåTabell from "./Satstabeller/MinstePensjonsnivåTabell";
import LønnsvekstTabell from "./Satstabeller/LønnsvekstTabell";
import GrunnpensjonTabell from "./Satstabeller/GrunnpensjonTabell";
import GrunnbeløpTabell from "./Satstabeller/GrunnbeløpTabell";
import GarantiPensjonsnivåTabell from "./Satstabeller/GarantiPensjonsnivåTabell";
import EØSKonvensjonslandTabell from "./Satstabeller/EØSKonvensjonslandTabell";
import BarnetilleggTak2016Tabell from "./Satstabeller/BarnetilleggTak2016Tabell";

class Satsvindu extends React.Component{
    constructor(props){
        super(props)
        this.state = {          
            error: null,
            isLoaded: false,
            verdier: []
        }
    }
    render(){
        console.log("satsvindu re-render");
        return(
            <div>
            <h1>Valgt Tabell: {this.props.currentTabell}</h1>
                    <VeietGrunnbeløpTabell key = {"veietGrunnbeløp: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></VeietGrunnbeløpTabell>
                    <UføretrygdMinsteytelseTabell key = {"UføretrygdMinsteytelse: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></UføretrygdMinsteytelseTabell>
                    <SærtilleggTabell key = {"Særtillegg: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></SærtilleggTabell>
                    <SkjermingstilleggTabell key = {"Skjermingstillegg: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></SkjermingstilleggTabell>
                    <RettsgebyrTabell key = {"Rettsgebyr: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></RettsgebyrTabell>
                    <ReguleringsfaktorTabell key = {"Reguleringsfaktor: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></ReguleringsfaktorTabell>
                    <NordiskKonvensjonslandTabell key = {"NordiskKonvensjonsland: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></NordiskKonvensjonslandTabell>
                    <MinstePensjonsnivåTabell key = {"MinstePensjonsnivå: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></MinstePensjonsnivåTabell>
                    <LønnsvekstTabell key = {"Lønnsvekst: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></LønnsvekstTabell>
                    <GrunnpensjonTabell key = {"Grunnpensjon: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></GrunnpensjonTabell>
                    <GrunnbeløpTabell key = {"Grunnbeløp: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></GrunnbeløpTabell>
                    <GarantiPensjonsnivåTabell key = {"GarantiPensjonsnivå: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></GarantiPensjonsnivåTabell>
                    <EØSKonvensjonslandTabell key = {"EØSKonvensjonsland: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></EØSKonvensjonslandTabell>
                    <BarnetilleggTak2016Tabell key = {"BarnetilleggTak2016: "+this.props.currentTabell} currentTabell = {this.props.currentTabell}></BarnetilleggTak2016Tabell>
            </div>
        );
    }
}

export default Satsvindu