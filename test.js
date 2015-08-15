var fs = require('fs');
var expect = require('chai').expect;

var path = require('path');
var spawn = require('child_process').spawn;

describe('progress-control-spec', function() {

  it('should capture keypress', function(done) {
    var value = 0.5;

    var bar = require('./index')('Use up/down arrows [:bar]', { total: 10 }, {
      'up': function() {
        value = 0.6;
        bar.update(value);
      }
    });

    bar.update(value);

    process.stdin.emit('keypress', null, {
      name: 'up'
    });

    expect(value).to.equal(0.6);
    done();
  });

});
