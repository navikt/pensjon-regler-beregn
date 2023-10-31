export async function fetchByLogId(href, logId) {
    let contentType = 'application/json'

    const response = await fetch(href + logId, {
        mode: 'cors',
        method: 'GET',
        headers: {'Content-Type': contentType, 'accept': contentType}
    })
    return response;
}