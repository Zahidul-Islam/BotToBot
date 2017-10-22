const rp = require('request-promise');
const logger = require('winston');

const request = require('./request');
const db = require('./../data/db');

let processTextResponses = (io, user, text, buttonText = null) => {
    let options = request.build(text, user);

    rp(options)
        .then(res => {
            const content = buttonText !== null ? buttonText : text;

            logger.log('info', `[🤔 ${user}] ${content}`);
            io.sockets.emit('message', { session: user, user: user, text: content });
        })
        .catch(err => logger.log('error', err));
}

let processQuickResponses = (io, user, quickResponses) => {
    const headerText = quickResponses.headerText;

    logger.log('info', `[🤖 Gyant] ${headerText}`);
    io.sockets.emit('message', { session: user, user: 'gyant', text: headerText });

    const { content, responseContext } = quickResponses.responses[0];

    if (isQuestion(headerText)) {
        let question = db.filter(q => headerText.includes(q.question) === true);
        if (question) {
            let response = quickResponses.responses.filter(res => res.content.includes(question[0].answer));
            processTextResponses(io, user, response[0].responseContext, response[0].content);
        }
    } else {
        let options = request.build(responseContext, user);
        rp(options)
            .then(res => {
                logger.log('info', `[🤔 ${user}] ${content}`);
                io.sockets.emit('message', { session: user, user: user, text: content });
            })
            .catch(err => logger.log('info', err));
    }
}

let isQuestion = (text) => text.indexOf('?') > 0;

module.exports = {
    processTextResponses,
    processQuickResponses,
    isQuestion
}