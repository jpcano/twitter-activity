var expect = require('chai').expect;
var TwitterActivity = require('../src/index');
var config = require('./config');

describe('twitter-activity', function() {
    var twitter;

    beforeEach(function (done) {
        twitter = new TwitterActivity(config);
        expect(twitter).to.be.an('object');
        expect(twitter.oauth).to.be.an('object');
        done();
    });

    describe('constructor', function () {
        it('should construct TwitterActivity object', function(done) {
            expect(twitter).to.be.an('object');
            expect(twitter.oauth).to.be.an('object');
            done();
        });
    })

    describe('activity', function () {
        it('should get the activity of a usder', function(done) {
            twitter.getActivity('Twitter', 5, function(err, data, res) {
                var parsed_data = JSON.parse(data);
                expect(parsed_data).to.have.length(5);
               done();
           });
        });
    });

   describe('wrong user', function () {
        it('should get the an error if the user is invalid', function(done) {
            twitter.getActivity('Twiadsfttersdf435', 5, function(err, data, res) {
                expect(err).to.be.an('error');
                done();
            });
        });
    });
});