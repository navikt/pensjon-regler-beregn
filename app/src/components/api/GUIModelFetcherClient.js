export async function fetGuiModel(href, body ) {
    let contentType = 'application/json';

    const response = await fetch(href, {
        method: 'POST',
        headers: {
            'Content-Type': contentType,
            'accept': 'application/json',
            'X-pensjonregler-log': 'disabled'
        },
        body: (body)
    })
    return response;
}