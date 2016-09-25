// jshint node: true
// jshint esnext: true
'use strict';

const assert = require('assert');
const the = require('../dist/the.min.js');

describe('isInstanceOf', function () {

	const Thing = function () {};

	const validValues = [
		new Thing()
	];

	const invalidValues = [
		'',
		'42',
		[],
		new Array(),
		(function () { return arguments; })(),
		-8,
		-Infinity,
		/.+/i,
		0,
		0xFF,
		1e0,
		4.20,
		42,
		Infinity,
		NaN,
		Thing.prototype,
		[].join(''),
		false,
		function () { return 42; },
		true,
		undefined,
		{}
	];

	validValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return true', function () {
				assert.equal(true, the(value).isInstanceOf(Thing, true));
			});
		});
	});

	invalidValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return false', function () {
				assert.equal(false, the(value).isInstanceOf(Thing, true));
			});
		});
	});

});

