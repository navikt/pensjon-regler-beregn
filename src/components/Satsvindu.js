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
import GarantiePensjonsnivåTabell from "./Satstabeller/GarantiPensjonsnivåTabell";
import EØSKonvensjonslandTabell from "./Satstabeller/EØSKonvensjonslandTabell";
import BarnetilleggTak2016Tabell from "./Satstabeller/BarnetilleggTak2016Tabell";

class Satsvindu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentTabell: this.props.currentTabell,            
            error: null,
            isLoaded: false,
            verdier: []
        }
    }
    render(){
        return(
            <div>
            <h1>Valgt Tabell: {this.state.currentTabell}</h1>
                    <VeietGrunnbeløpTabell currentTabell = {this.state.currentTabell}></VeietGrunnbeløpTabell>
                    <UføretrygdMinsteytelseTabell currentTabell = {this.state.currentTabell}></UføretrygdMinsteytelseTabell>
                    <SærtilleggTabell currentTabell = {this.state.currentTabell}></SærtilleggTabell>
                    <SkjermingstilleggTabell currentTabell = {this.state.currentTabell}></SkjermingstilleggTabell>
                    <RettsgebyrTabell currentTabell = {this.state.currentTabell}></RettsgebyrTabell>
                    <ReguleringsfaktorTabell currentTabell = {this.state.currentTabell}></ReguleringsfaktorTabell>
                    <NordiskKonvensjonslandTabell currentTabell = {this.state.currentTabell}></NordiskKonvensjonslandTabell>
                    <MinstePensjonsnivåTabell currentTabell = {this.state.currentTabell}></MinstePensjonsnivåTabell>
                    <LønnsvekstTabell currentTabell = {this.state.currentTabell}></LønnsvekstTabell>
                    <GrunnpensjonTabell currentTabell = {this.state.currentTabell}></GrunnpensjonTabell>
                    <GrunnbeløpTabell currentTabell = {this.state.currentTabell}></GrunnbeløpTabell>
                    <GarantiePensjonsnivåTabell currentTabell = {this.state.currentTabell}></GarantiePensjonsnivåTabell>
                    <EØSKonvensjonslandTabell currentTabell = {this.state.currentTabell}></EØSKonvensjonslandTabell>
                    <BarnetilleggTak2016Tabell currentTabell = {this.state.currentTabell}></BarnetilleggTak2016Tabell>
            </div>
        );
    }
}

export default Satsvindu