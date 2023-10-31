export async function fetchSatser() {
    let url = 'https://pensjon-regler-q2.dev.adeo.no/alleSatstabeller';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type':  'application/json',
            'accept': 'application/json'
        }
    });
    console.log("response =>", response);
    return response;
}