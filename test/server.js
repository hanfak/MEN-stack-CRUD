var expect  = require("chai").expect;
var should = require("should");
var request = require("request");

var indexURL = 'http://localhost:3001';
var playersURL = 'http://localhost:3001/players';
var playerURL = 'http://localhost:3001/players/1';
var player2URL = 'http://localhost:3001/players/5';
var falseURL = 'http://localhost:3001/play';


describe('Server', function() {
  it('should be up and running', function(done) {
    request.get(indexURL, function(err, response, body) {
      response.statusCode.should.equal(200);
      done();
    });
  });

  it('return string', function(done) {
    request.get(indexURL, function(err, response, body) {
      expect(response.body).to.be.a('string');
      done();
    });
  });

  it('should get players', function(done) {
    request.get(playersURL, function(err, response, body) {
      response.statusCode.should.equal(200);
      done();
    });
  });

  it('should get 3 players', function(done) {
    request.get(playersURL, function(err, response, body) {

      // console.log(response);
      expect(response.body).include("3 players");
      done();
    });
  });

  it('should get player', function(done) {
    request.get(playerURL, function(err, response, body) {
      response.statusCode.should.equal(200);
      done();
    });
  });

  it('should get specific player', function(done) {
    request.get(playerURL, function(err, response, body) {

      console.log(response.body.player);
      expect(response.body).include("Steve has scored 13");
      done();
    });
  });

  it('should get no player', function(done) {
    request.get(player2URL, function(err, response, body) {

      expect(response.body).not.include(" has scored ");
      done();
    });
  });

  it('should return 404', function(done) {
    request.get(falseURL, function(err, response, body) {
      response.statusCode.should.equal(404);
      done();
    });
  });
});
