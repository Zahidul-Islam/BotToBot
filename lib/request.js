if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { SERVICE_URL, GYANT_URL } = process.env;

let build = (message, userId) => {
    let payload = {};

    payload.type = 'message';
    payload.timestamp = new Date();
    payload.text = message;
    payload.address = {
        serviceUrl: SERVICE_URL,
        type: "direct"
    };
    payload.user = {
        id: userId,
        name: userId
    };
    payload.source = "testing";
    payload.token = "zahid-p3cFBTbVZy"

    return request = {
        method: 'POST',
        uri: GYANT_URL,
        body: payload,
        json: true,
        resolveWithFullResponse: true
    };
}

module.exports = {
    build
}