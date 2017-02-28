window.es6Example.promise = {};

window.es6Example.promise.code =
`var longFn = function() {
	return new Promise(function(res, rej) {
		setTimeout(res, 1000);
	});
};

var coolFn = function() {
	console.log('cool');
};

// logs cool after 1 second
longFn().then(coolFn);`;

window.es6Example.promise.display = 'Promises';
