var value = 0.5;

var bar = require('../')('Use up/down arrows [:bar]', { total: 10 }, {
  'up': function() {
    value = Math.min(Math.round((value + 0.1) * 10) / 10, 1);
	  bar.update(value);
  },
  'down': function() {
    value = Math.max(Math.round((value - 0.1) * 10) / 10, 0);
    bar.update(value);
  },
  'ctrl-v': function() {
    value = 1.0;
    bar.update(value);
  }
});

bar.update(value);

setTimeout(function() {
  bar.close();
  console.log('hi');
}, 1000);
