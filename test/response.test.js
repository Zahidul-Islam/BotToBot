const should = require('chai').should();
const response = require('../lib/response');

describe('Bot response object', () => {
    it('should identify a question', () => {
        let isAQuestion = response.isQuestion('how old are you in human years?');
        isAQuestion.should.be.equals(true);
    });
});