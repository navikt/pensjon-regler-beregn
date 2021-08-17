import React from "react";
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
import "../App.css";
import Collapse from 'react-bootstrap/Collapse'

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
        return(
            <div class = "satstabell-container">
                <h1>Valgt Tabell: {this.props.currentTabell}</h1>
                <VeietGrunnbeløpTabell 
                    key = {"veietGrunnbeløp: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </VeietGrunnbeløpTabell>

                <UføretrygdMinsteytelseTabell 
                    key = {"UføretrygdMinsteytelse: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </UføretrygdMinsteytelseTabell>

                <SærtilleggTabell 
                    key = {"Særtillegg: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </SærtilleggTabell>

                <SkjermingstilleggTabell 
                    key = {"Skjermingstillegg: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </SkjermingstilleggTabell>

                <RettsgebyrTabell 
                    key = {"Rettsgebyr: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </RettsgebyrTabell>

                <ReguleringsfaktorTabell 
                    key = {"Reguleringsfaktor: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </ReguleringsfaktorTabell>

                <NordiskKonvensjonslandTabell
                    key = {"NordiskKonvensjonsland: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </NordiskKonvensjonslandTabell>

                <MinstePensjonsnivåTabell 
                    key = {"MinstePensjonsnivå: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </MinstePensjonsnivåTabell>

                <LønnsvekstTabell 
                    key = {"Lønnsvekst: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </LønnsvekstTabell>

                <GrunnpensjonTabell 
                    key = {"Grunnpensjon: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </GrunnpensjonTabell>

                <GrunnbeløpTabell 
                    key = {"Grunnbeløp: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </GrunnbeløpTabell>

                <GarantiPensjonsnivåTabell 
                    key = {"GarantiPensjonsnivå: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </GarantiPensjonsnivåTabell>

                <EØSKonvensjonslandTabell 
                    key = {"EØSKonvensjonsland: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </EØSKonvensjonslandTabell>

                <BarnetilleggTak2016Tabell 
                    key = {"BarnetilleggTak2016: "+this.props.currentTabell+this.props.valgtMiljø+this.props.aktiv} 
                    currentTabell = {this.props.currentTabell} 
                    valgtMiljø = {this.props.valgtMiljø} 
                    aktiv = {this.props.aktiv}>
                </BarnetilleggTak2016Tabell>
            </div>
        );
    }
}

export default Satsvindu