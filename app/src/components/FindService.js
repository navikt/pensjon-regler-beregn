
export default function FindService(fetchedMethod) {

    fetchedMethod = fetchedMethod.replace("/api/","") //remove '/api/' from string
    let serviceName = ""

    //special cases TODO fill in rest
    if(fetchedMethod === 'beregnSamletEktefellepensjon') {
        fetchedMethod = 'samletEktefellepensjon'
    } else if (fetchedMethod === 'faktoromregnBeregninger') {
        fetchedMethod = 'faktoromregnBeregningBatch'
    } else if (fetchedMethod === 'fastsettTrygdetid') {
        fetchedMethod = 'trygdetid'
    } else if (fetchedMethod === 'faktoromregnInntekter') {
        fetchedMethod == 'faktoromregnInntekterBatch'
    } else if (fetchedMethod === 'inntektsavkortUforetrygd') {
        fetchedMethod == 'inntektsavkortingUforetrygd'
    } else if (fetchedMethod === 'regulerAfpPrivat') {
        fetchedMethod == 'regulerAfpPrivatBeregning'
    } else if (fetchedMethod === 'vilkarsprovAlderspensjonOver67') {
        fetchedMethod == 'vilkarsprov'
    } else if (
        fetchedMethod === 'beregnUforepensjon' || 
        fetchedMethod === 'beregnAlderspensjon' ||
        fetchedMethod === 'beregnAFP' ||
        fetchedMethod === 'beregnBarnepensjon' ||
        fetchedMethod === 'beregnFamiliepleierpensjon' ||
        fetchedMethod === 'beregnGjenlevendepensjon' ) {
        fetchedMethod == 'beregnYtelse'
    } else if (
        fetchedMethod === 'simulerUforepensjon' ||
        fetchedMethod === 'simulerAlderspensjon' ||
        fetchedMethod === 'simulerBarnepensjon' ||
        fetchedMethod === 'simulerAFP' ||
        fetchedMethod === 'simulerVilkarsprovAFP' ) {
            fetchedMethod == 'simulering'
    }

    serviceName = fetchedMethod.charAt(0).toUpperCase() + fetchedMethod.slice(1)+'Request'
    return serviceName
}