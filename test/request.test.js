const should = require('chai').should();
const request = require('../lib/request');

describe('Bot Request builder', () => {
    it('should build a request object', () => {
        let options = request.build('Hello', 'joe');
        options.should.not.be.null;
    });

    it('should build a request object with user "joe"', () => {
        let options = request.build('Hello', 'joe');
        options.should.not.be.null;
        options.body.user.name.should.be.equals('joe');
    });

    it('should build a request object with message "Hello"', () => {
        let options = request.build('Hello', 'joe');
        options.should.not.be.null;
        options.body.text.should.be.equals('Hello');
    });
});