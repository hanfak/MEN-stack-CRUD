var expect  = require("chai").expect;
var should = require("should");
var request = require("request");

var indexURL = 'http://localhost:3001';

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
});
