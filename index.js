var ProgressBar = require('progress');
var keypress = require('keypress');
var tty = require('tty');

module.exports = function(format, progressBarOptions, bindings) {

  var setRawMode = function(val) {
    if (typeof process.stdin.setRawMode == 'function') {
      process.stdin.setRawMode(val);
    } else {
      tty.setRawMode(val);
    }
  }

  var bar = new ProgressBar(format, progressBarOptions);
  var enabled = true;

  bar.terminate = function() {
    // override internal api to prevent termination on full bar
  };

  bar.close = function() {
    this.stream.clearLine();
    this.stream.cursorTo(0);

    setRawMode(false);
    enabled = false;
  };

  keypress(process.stdin);

  process.stdin.on('keypress', function (ch, key) {
    if (enabled && key) {
      if (key.ctrl === true) {
        if (key.name === 'c') {
          process.stdin.pause();
        } else if (key.name === 'd') {
          process.exit();
        }
        var binding = bindings['ctrl-' + key.name];
        if (binding && typeof binding === 'function') {
          binding();
        }
      } else if (key.name in bindings && typeof bindings[key.name] === 'function') {
        bindings[key.name]();
      }
    }
  });

  setRawMode(true);

  process.stdin.resume();
  return bar;
};
