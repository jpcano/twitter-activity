var expect = require('chai').expect;
var TwitterActivity = require('../src/index');
var config = require('./config');

describe('twitter-activity', function() {
    twitter = new TwitterActivity(config);

    describe('constructor', function () {
        it('should construct TwitterActivity object', function() {
            expect(twitter).to.be.an('object');
            expect(twitter.oauth).to.be.an('object');
        });
    });

    describe('activity', function () {
        it('should get the activity of a user', function() {
            twitter.getActivity('Twitter', 5, false, function(err, data, request) {
                var parsed_data = (JSON.parse(data));
                expect(parsed_data).to.have.length(5);
            });
        });
    });

    describe('wrong user', function () {
        it('should get the an error if the user is invalid', function() {
            twitter.getActivity('ddfa345asdf3443d', 5, false, function(err, data, request) {
                expect(err).to.be.an('error');
            });
        });
    });
});