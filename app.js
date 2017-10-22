const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const logger = require('winston');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const request = require('./lib/request');
const db = require('./data/db');

const { processQuickResponses, processTextResponses } = require('./lib/response');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/start', (req, res) => {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const userName = `User-${suffix}`;
    const options = request.build('Hello', userName);

    rp(options)
        .then(res => {
            const user = options.body.user.name;

            logger.log('info', `[🤔 ${user}] Hello`);
            io.emit('message', { session: user, user: user, text: 'Hello' });
        })
        .catch(err => logger.log('error', 'error', err));

    res.json({ message: 'Success', session: userName })
});

app.post('/api/messages', (req, res, done) => {
    const { message, user } = req.body;
    const action = message.pop();

    message.forEach(msg => {
        if (msg.type === 'text') {
            logger.log('info', `[🤖 Gyant] ${msg.content}`);
            io.emit('message', { session: user.name, user: 'gyant', text: msg.content });
        } else if (msg.type === 'quickResponses') {
            processQuickResponses(io, user.name, msg);
        }
    });

    if (action.type === 'quickResponses') {
        processQuickResponses(io, user.name, action);
    } else {
        let question = db.filter(q => q.question === action.content);
        if (question && question[0]) {
            processTextResponses(io, user.name, question[0].answer);
        } else {
            logger.log('info', `[🤖 Gyant] ${JSON.stringify(action)}`);
        }
    }
    done();
});

io.on('connection', socket => {
    logger.log('info', 'A bot start talking')
    socket.on('disconnect', () => {
        logger.log('info', 'Bot stop talking');
    });
});

server.listen(port, () => logger.log('info', 'API is running on port: ' + port));