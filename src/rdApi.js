/**
 * 
 * @param {[{key: string, value: string}]} keysValues Array of key value pair.
 */
function FormUrlEncoded(keysValues) {
    let formBody = [];

    for(let keyValue of keysValues)
    {
        let encodedKey = encodeURIComponent(keyValue.key);
        let encodedVal = encodeURIComponent(keyValue.value);
        formBody.push(encodedKey + '=' + encodedVal);
    }

    return formBody.join('&');
}

/**
 * Check link for unrestrict
 * @param {string} host Host url
 * @param {string} link The link to check
 */
function UnrestrictCheck(host, link) {
    host += 'unrestrict/check';
    return fetch(host, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: FormUrlEncoded([{ key: 'link', value: link }])
    })
    .then(response => {
        return response.json();
    })
}

/**
 * Unrestrict a link
 * @param {string} host Host url
 * @param {string} link The link to check
 */
function UnrestrictLink(host, link) {
    host += 'unrestrict/link';
    return fetch(host, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: FormUrlEncoded([{ key: 'link', value: link }])
    })
    .then(response => {
        return response.json();
    })
}