var ProgressBar = require('progress');
var keypress = require('keypress');
var tty = require('tty');

module.exports = function(format, progressBarOptions, bindings) {

  var bar = new ProgressBar(format, progressBarOptions);
  bar.terminate = function() {
    // don't terminate bar on full brightness
  };

  keypress(process.stdin);

  process.stdin.on('keypress', function (ch, key) {
    if (key) {
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

  if (typeof process.stdin.setRawMode == 'function') {
    process.stdin.setRawMode(true);
  } else {
    tty.setRawMode(true);
  }

  process.stdin.resume();
  return bar;
};
